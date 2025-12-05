import asyncio
import uuid
import os
from typing import Dict, Optional, List
from datetime import datetime
import sys

# 상위 디렉토리의 크롤러 임포트
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
from bs_crwal import NaverSmartStoreReviewCrawler

from models.schemas import TaskStatusEnum


class CrawlerTask:
    """크롤링 작업 정보"""
    def __init__(self, task_id: str, product_url: str, rating_filter: Optional[List[int]], max_reviews: int):
        self.task_id = task_id
        self.product_url = product_url
        self.rating_filter = rating_filter
        self.max_reviews = max_reviews
        self.status = TaskStatusEnum.PENDING
        self.progress = 0
        self.collected_count = 0
        self.message = "작업 대기 중"
        self.error: Optional[str] = None
        self.excel_file: Optional[str] = None
        self.csv_file: Optional[str] = None
        self.reviews = []


class CrawlerService:
    """크롤러 서비스 - 비동기 작업 관리"""
    
    def __init__(self):
        self.tasks: Dict[str, CrawlerTask] = {}
        self.output_dir = "downloads"
        os.makedirs(self.output_dir, exist_ok=True)
    
    def create_task(self, product_url: str, rating_filter: Optional[List[int]], max_reviews: int) -> str:
        """새 크롤링 작업 생성"""
        task_id = str(uuid.uuid4())
        task = CrawlerTask(task_id, product_url, rating_filter, max_reviews)
        self.tasks[task_id] = task
        return task_id
    
    def get_task(self, task_id: str) -> Optional[CrawlerTask]:
        """작업 정보 조회"""
        return self.tasks.get(task_id)
    
    async def run_crawler(self, task_id: str):
        """크롤러 실행 (비동기)"""
        task = self.tasks.get(task_id)
        if not task:
            return
        
        try:
            task.status = TaskStatusEnum.PROCESSING
            task.message = "크롤링 시작"
            
            # 동기 크롤러를 별도 스레드에서 실행
            loop = asyncio.get_event_loop()
            await loop.run_in_executor(None, self._run_sync_crawler, task)
            
        except Exception as e:
            task.status = TaskStatusEnum.FAILED
            task.error = str(e)
            task.message = f"크롤링 실패: {str(e)}"
    
    def _run_sync_crawler(self, task: CrawlerTask):
        """동기 크롤러 실행 (스레드에서 실행됨)"""
        try:
            # 크롤러 인스턴스 생성
            crawler = NaverSmartStoreReviewCrawler(
                product_url=task.product_url,
                rating_filter=task.rating_filter
            )
            
            # 크롤러 실행
            task.message = "Chrome 드라이버 초기화 중..."
            task.progress = 5
            crawler.setup_driver()
            
            task.message = "제품 페이지 로딩 중..."
            task.progress = 10
            crawler.navigate_to_product()
            
            task.message = "리뷰 탭으로 이동 중..."
            task.progress = 15
            crawler.click_review_tab()
            
            # 리뷰 수집 (진행 상태 업데이트를 위한 커스텀 수집)
            task.message = "리뷰 수집 중..."
            task.progress = 20
            
            # 별도 스레드에서 진행률 업데이트
            import threading
            stop_progress = threading.Event()
            
            def update_progress():
                while not stop_progress.is_set():
                    if hasattr(crawler, 'reviews') and crawler.reviews:
                        collected = len(crawler.reviews)
                        task.collected_count = collected
                        # 진행률 계산 (20~90% 범위)
                        progress = 20 + int((collected / task.max_reviews) * 70)
                        task.progress = min(progress, 90)
                        task.message = f"리뷰 수집 중... ({collected}/{task.max_reviews}개)"
                    stop_progress.wait(1)  # 1초마다 업데이트
            
            progress_thread = threading.Thread(target=update_progress)
            progress_thread.start()
            
            try:
                crawler.collect_reviews_by_pagination(max_reviews=task.max_reviews)
            finally:
                stop_progress.set()
                progress_thread.join()
            
            # 결과 저장
            task.progress = 95
            task.message = "파일 저장 중..."
            
            if crawler.reviews:
                task.collected_count = len(crawler.reviews)
                task.reviews = crawler.reviews
                
                # 파일 저장
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                csv_filename = f"{self.output_dir}/reviews_{task.task_id}_{timestamp}.csv"
                excel_filename = f"{self.output_dir}/reviews_{task.task_id}_{timestamp}.xlsx"
                
                crawler.save_to_csv(csv_filename)
                crawler.save_to_excel(excel_filename)
                
                task.csv_file = csv_filename
                task.excel_file = excel_filename
                task.status = TaskStatusEnum.COMPLETED
                task.progress = 100
                task.message = f"크롤링 완료! {task.collected_count}개 리뷰 수집"
            else:
                task.status = TaskStatusEnum.FAILED
                task.message = "조건에 맞는 리뷰를 찾지 못했습니다"
            
            crawler.close()
            
        except Exception as e:
            task.status = TaskStatusEnum.FAILED
            task.error = str(e)
            task.message = f"크롤링 실패: {str(e)}"
    
    def get_task_status(self, task_id: str) -> dict:
        """작업 상태 반환"""
        task = self.tasks.get(task_id)
        if not task:
            return {
                "task_id": task_id,
                "status": TaskStatusEnum.FAILED,
                "progress": 0,
                "collected_count": 0,
                "total_target": 0,
                "message": "작업을 찾을 수 없습니다",
                "error": "Invalid task ID"
            }
        
        return {
            "task_id": task.task_id,
            "status": task.status,
            "progress": task.progress,
            "collected_count": task.collected_count,
            "total_target": task.max_reviews,
            "message": task.message,
            "error": task.error,
            "download_url": f"/api/download/{task_id}" if task.status == TaskStatusEnum.COMPLETED else None
        }


# 싱글톤 인스턴스
crawler_service = CrawlerService()
