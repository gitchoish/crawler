from pydantic import BaseModel, HttpUrl, Field, validator
from typing import Optional, List
from enum import Enum


class TaskStatusEnum(str, Enum):
    """작업 상태"""
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class CrawlRequest(BaseModel):
    """크롤링 요청 스키마"""
    product_url: str = Field(
        ..., 
        description="네이버 브랜드스토어 제품 URL",
        example="https://brand.naver.com/denps/products/11261507716"
    )
    rating_filter: Optional[List[int]] = Field(
        None,
        description="평점 필터 (1-5). None이면 모든 평점 수집",
        example=[4, 5]
    )
    max_reviews: int = Field(
        default=100,
        ge=1,
        le=1000,
        description="수집할 최대 리뷰 개수 (1-1000)",
        example=100
    )

    @validator('product_url')
    def validate_naver_url(cls, v):
        """네이버 브랜드스토어 URL 검증"""
        if not v.startswith('https://brand.naver.com/'):
            raise ValueError('네이버 브랜드스토어 URL만 지원합니다')
        return v

    @validator('rating_filter')
    def validate_ratings(cls, v):
        """평점 필터 검증"""
        if v is not None:
            for rating in v:
                if rating < 1 or rating > 5:
                    raise ValueError('평점은 1-5 사이여야 합니다')
        return v


class CrawlResponse(BaseModel):
    """크롤링 응답 스키마"""
    task_id: str = Field(..., description="작업 ID")
    status: TaskStatusEnum = Field(..., description="작업 상태")
    message: str = Field(..., description="상태 메시지")


class TaskStatusResponse(BaseModel):
    """작업 상태 조회 응답"""
    task_id: str
    status: TaskStatusEnum
    progress: int = Field(default=0, ge=0, le=100, description="진행률 (0-100)")
    collected_count: int = Field(default=0, description="수집된 리뷰 개수")
    total_target: int = Field(default=0, description="목표 리뷰 개수")
    message: str
    error: Optional[str] = None
    download_url: Optional[str] = None


class ReviewData(BaseModel):
    """리뷰 데이터 스키마"""
    number: int
    date: str
    rating: str
    reviewer: str
    content: str
    tags: str
    has_photo: bool


class CrawlResult(BaseModel):
    """크롤링 결과 스키마"""
    task_id: str
    total_reviews: int
    reviews: List[ReviewData]
    excel_file: Optional[str] = None
    csv_file: Optional[str] = None
