from fastapi import APIRouter, BackgroundTasks, HTTPException
from fastapi.responses import FileResponse
import os

from models.schemas import (
    CrawlRequest, 
    CrawlResponse, 
    TaskStatusResponse,
    TaskStatusEnum
)
from services.crawler_service import crawler_service

router = APIRouter(prefix="/api", tags=["crawler"])


@router.post("/crawl", response_model=CrawlResponse)
async def start_crawl(request: CrawlRequest, background_tasks: BackgroundTasks):
    """
    크롤링 작업 시작
    
    - **product_url**: 네이버 브랜드스토어 제품 URL
    - **rating_filter**: 평점 필터 (예: [4, 5]는 4점과 5점만)
    - **max_reviews**: 수집할 최대 리뷰 개수 (1-1000)
    """
    try:
        # 작업 생성
        task_id = crawler_service.create_task(
            product_url=request.product_url,
            rating_filter=request.rating_filter,
            max_reviews=request.max_reviews
        )
        
        # 백그라운드에서 크롤링 실행
        background_tasks.add_task(crawler_service.run_crawler, task_id)
        
        return CrawlResponse(
            task_id=task_id,
            status=TaskStatusEnum.PENDING,
            message="크롤링 작업이 시작되었습니다"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status/{task_id}", response_model=TaskStatusResponse)
async def get_status(task_id: str):
    """
    작업 진행 상태 조회
    
    - **task_id**: 작업 ID
    """
    status = crawler_service.get_task_status(task_id)
    return TaskStatusResponse(**status)


@router.get("/download/{task_id}")
async def download_file(task_id: str, format: str = "excel"):
    """
    결과 파일 다운로드
    
    - **task_id**: 작업 ID
    - **format**: 파일 형식 (excel 또는 csv)
    """
    task = crawler_service.get_task(task_id)
    
    if not task:
        raise HTTPException(status_code=404, detail="작업을 찾을 수 없습니다")
    
    if task.status != TaskStatusEnum.COMPLETED:
        raise HTTPException(status_code=400, detail="작업이 완료되지 않았습니다")
    
    # 파일 선택
    if format.lower() == "csv":
        file_path = task.csv_file
        media_type = "text/csv"
    else:
        file_path = task.excel_file
        media_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    
    if not file_path or not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="파일을 찾을 수 없습니다")
    
    filename = os.path.basename(file_path)
    
    return FileResponse(
        path=file_path,
        media_type=media_type,
        filename=filename
    )


@router.get("/health")
async def health_check():
    """헬스 체크"""
    return {"status": "healthy", "service": "naver-review-crawler"}
