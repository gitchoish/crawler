FROM python:3.11-slim

WORKDIR /app

# 시스템 의존성 설치
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    unzip \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Chrome 설치 (새로운 방식)
RUN wget -q -O /tmp/chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt-get update \
    && apt-get install -y /tmp/chrome.deb \
    && rm /tmp/chrome.deb \
    && rm -rf /var/lib/apt/lists/*

# Python 의존성
COPY api/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# 코드 복사
COPY bs_crwal.py ./
COPY api/ ./

# downloads 디렉토리 생성
RUN mkdir -p downloads

# 포트 노출
EXPOSE 10000

# 서버 실행
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-10000}"]
