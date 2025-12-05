FROM node:18-slim AS frontend-builder

WORKDIR /app/frontend

# Frontend 의존성 설치
COPY frontend/package*.json ./
RUN npm ci

# Frontend 빌드
COPY frontend/ ./
ENV NEXT_PUBLIC_API_URL=/api
RUN npm run build

# 최종 이미지
FROM python:3.11-slim

WORKDIR /app

# 시스템 의존성 설치
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    unzip \
    curl \
    nginx \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Chrome 설치
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Node.js 설치 (Next.js 실행용)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
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
COPY --from=frontend-builder /app/frontend/node_modules ./frontend/node_modules

# downloads 디렉토리 생성
RUN mkdir -p api/downloads

# Nginx 설정
COPY nginx.conf /etc/nginx/nginx.conf

# Supervisor 설정
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# 포트 노출
EXPOSE 10000

# Supervisor로 서비스 실행
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
