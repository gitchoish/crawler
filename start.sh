#!/bin/sh

echo "Starting services..."

# Backend 시작 (백그라운드, 포트 8000)
cd /app/api
python -m uvicorn main:app --host 0.0.0.0 --port 8000 &
echo "Backend started on port 8000"

# 잠시 대기
sleep 3

# Frontend 시작 (포트 10000 - Render가 사용하는 포트)
cd /app/frontend
echo "Starting frontend on port 10000..."
PORT=10000 NEXT_PUBLIC_API_URL=http://localhost:8000 node_modules/.bin/next start -p 10000
