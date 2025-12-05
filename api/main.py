from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os

from routers import crawler

# FastAPI 앱 생성
app = FastAPI(
    title="네이버 리뷰 크롤러 API",
    description="네이버 브랜드스토어 리뷰를 수집하는 API 서비스",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS 설정 - 환경 변수에서 읽기
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:3001").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(crawler.router)

# 전역 예외 처리
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "detail": "서버 내부 오류가 발생했습니다",
            "error": str(exc)
        }
    )

# 루트 엔드포인트
@app.get("/")
async def root():
    return {
        "message": "네이버 리뷰 크롤러 API",
        "version": "1.0.0",
        "docs": "/docs"
    }

# 시작 이벤트
@app.on_event("startup")
async def startup_event():
    # downloads 디렉토리 생성
    os.makedirs("downloads", exist_ok=True)
    print("🚀 API 서버가 시작되었습니다")
    print("📂 다운로드 디렉토리: downloads/")

# 종료 이벤트
@app.on_event("shutdown")
async def shutdown_event():
    print("👋 API 서버를 종료합니다")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
