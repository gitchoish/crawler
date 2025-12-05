FROM node:18-slim AS frontend-builder

WORKDIR /app/frontend

# Frontend 빌드
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Backend + Frontend 통합 이미지
FROM python:3.11-slim

WORKDIR /app

# 시스템 의존성 + Node.js 설치
RUN apt-get update && apt-get install -y \
    wget curl gnupg ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Chrome 설치
RUN wget -q -O /tmp/chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt-get update \
    && apt-get install -y /tmp/chrome.deb \
    && rm /tmp/chrome.deb \
    && rm -rf /var/lib/apt/lists/*

# Python 의존성
COPY api/requirements.txt ./api/
RUN pip install --no-cache-dir -r api/requirements.txt

# Backend 코드
COPY bs_crwal.py ./
COPY api/ ./api/

# Frontend 빌드 결과물 복사
COPY --from=frontend-builder /app/frontend/.next ./frontend/.next
COPY --from=frontend-builder /app/frontend/public ./frontend/public
COPY --from=frontend-builder /app/frontend/package*.json ./frontend/
COPY --from=frontend-builder /app/frontend/next.config.js ./frontend/
RUN cd frontend && npm install --production

# downloads 디렉토리
RUN mkdir -p api/downloads

# 시작 스크립트
COPY start.sh ./
RUN chmod +x start.sh

EXPOSE 10000

CMD ["./start.sh"]
