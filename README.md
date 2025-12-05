# 네이버 리뷰 크롤러 웹 서비스 🚀

네이버 브랜드스토어의 리뷰를 쉽고 빠르게 수집하는 웹 서비스입니다.

## ✨ 주요 기능

- 🎯 **평점 필터링**: 원하는 평점의 리뷰만 선택적으로 수집
- 📊 **Excel/CSV 지원**: 수집한 데이터를 Excel 또는 CSV 형식으로 다운로드
- 🖼️ **사진 리뷰 구분**: 사진이 포함된 리뷰 자동 구분
- 🏷️ **태그 자동 추출**: 리뷰에서 주요 키워드 자동 추출
- ⚡ **실시간 진행 상태**: 크롤링 진행 상황 실시간 확인
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원

## 🛠️ 기술 스택

### Backend
- **FastAPI**: Python 웹 프레임워크
- **Selenium**: 웹 크롤링
- **Pandas**: 데이터 처리
- **Uvicorn**: ASGI 서버

### Frontend
- **Next.js 14**: React 프레임워크
- **TypeScript**: 타입 안정성
- **TailwindCSS**: 스타일링
- **Axios**: HTTP 클라이언트

## 📦 설치 및 실행

### 방법 1: Docker Compose (권장)

```bash
# 프로젝트 클론
git clone <repository-url>
cd naver_crawling

# Docker Compose로 실행
docker-compose up -d

# 접속
# Frontend: http://localhost:3000
# API Docs: http://localhost:8000/docs
```

### 방법 2: 로컬 개발 환경

#### Backend 실행

```bash
cd api

# 가상환경 생성 (선택사항)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 서버 실행
python main.py
# 또는
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend 실행

```bash
cd frontend

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일에서 NEXT_PUBLIC_API_URL 확인

# 개발 서버 실행
npm run dev
```

## 🎮 사용 방법

1. **제품 URL 입력**
   - 네이버 브랜드스토어 제품 페이지 URL 복사
   - 예: `https://brand.naver.com/denps/products/11261507716`

2. **옵션 설정**
   - 평점 필터: 수집할 평점 선택 (선택사항)
   - 리뷰 개수: 10~1000개 사이에서 선택

3. **크롤링 시작**
   - "크롤링 시작" 버튼 클릭
   - 진행 상황 실시간 확인

4. **결과 다운로드**
   - 완료 후 Excel 또는 CSV 파일 다운로드

## 📁 프로젝트 구조

```
naver_crawling/
├── api/                      # Backend API
│   ├── main.py              # FastAPI 앱
│   ├── models/              # Pydantic 스키마
│   ├── routers/             # API 라우터
│   ├── services/            # 비즈니스 로직
│   ├── requirements.txt     # Python 의존성
│   └── Dockerfile           # Backend Docker 이미지
│
├── frontend/                # Frontend 웹앱
│   ├── app/                 # Next.js 앱 라우터
│   │   ├── layout.tsx       # 루트 레이아웃
│   │   ├── page.tsx         # 메인 페이지
│   │   └── globals.css      # 전역 스타일
│   ├── components/          # React 컴포넌트
│   │   ├── CrawlerForm.tsx  # 크롤링 입력 폼
│   │   ├── ProgressTracker.tsx  # 진행 상태 표시
│   │   ├── ResultDownload.tsx   # 결과 다운로드
│   │   └── AdSenseAd.tsx    # 광고 컴포넌트
│   ├── lib/                 # 유틸리티
│   │   └── api.ts           # API 클라이언트
│   ├── package.json         # Node 의존성
│   └── Dockerfile           # Frontend Docker 이미지
│
├── bs_crwal.py              # 원본 크롤러 클래스
├── docker-compose.yml       # Docker Compose 설정
└── README.md                # 프로젝트 문서
```

## 🔧 API 엔드포인트

### POST `/api/crawl`
크롤링 작업 시작

**Request Body:**
```json
{
  "product_url": "https://brand.naver.com/...",
  "rating_filter": [4, 5],
  "max_reviews": 100
}
```

**Response:**
```json
{
  "task_id": "uuid",
  "status": "pending",
  "message": "크롤링 작업이 시작되었습니다"
}
```

### GET `/api/status/{task_id}`
작업 진행 상태 조회

**Response:**
```json
{
  "task_id": "uuid",
  "status": "processing",
  "progress": 45,
  "collected_count": 45,
  "total_target": 100,
  "message": "리뷰 수집 중...",
  "download_url": null
}
```

### GET `/api/download/{task_id}`
결과 파일 다운로드

**Query Parameters:**
- `format`: `excel` 또는 `csv` (기본값: `excel`)

## 💰 수익화 (AdSense)

### AdSense 설정

1. **Google AdSense 계정 생성**
   - https://www.google.com/adsense 에서 가입

2. **광고 단위 생성**
   - 디스플레이 광고 3개 생성 (배너, 사이드바, 인피드)

3. **환경 변수 설정**
   ```bash
   # frontend/.env.local
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-YOUR_PUBLISHER_ID
   ```

4. **광고 슬롯 ID 업데이트**
   - `frontend/components/AdSenseAd.tsx` 파일에서 슬롯 ID 교체

### 광고 배치 위치
- **상단 배너**: 메인 헤더 아래
- **사이드바**: 오른쪽 사이드바
- **인피드**: 크롤링 진행 중 표시

## 🚀 배포

### Vercel (Frontend)

```bash
cd frontend
vercel
```

### Render/Railway (Backend)

1. GitHub 저장소 연결
2. 루트 디렉토리: `api`
3. 빌드 명령: `pip install -r requirements.txt`
4. 시작 명령: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## ⚠️ 주의사항

- 이 도구는 **개인적인 용도**로만 사용하세요
- 과도한 크롤링은 IP 차단의 원인이 될 수 있습니다
- 네이버의 이용 약관을 준수하세요
- 초기 설정: 사용자당 **하루 5회 제한** 권장

## 📝 라이선스

MIT License

## 🤝 기여

이슈와 풀 리퀘스트는 언제나 환영합니다!

## 📧 문의

문제가 발생하거나 질문이 있으시면 이슈를 등록해주세요.

---

**Made with ❤️ by Naver Review Crawler**
