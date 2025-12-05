#!/bin/sh

echo "Starting services..."

# Backend 시작 (백그라운드, 포트 8000)
cd /app/api
python -m uvicorn main:app --host 127.0.0.1 --port 8000 &
BACKEND_PID=$!
echo "Backend started on port 8000 (PID: $BACKEND_PID)"

# Backend가 시작될 때까지 대기
sleep 5

# Backend 상태 확인
if kill -0 $BACKEND_PID 2>/dev/null; then
    echo "Backend is running"
else
    echo "Backend failed to start!"
    exit 1
fi

# Frontend 시작 (포트 10000 - Render가 사용하는 포트)
cd /app/frontend
echo "Starting frontend on port 10000..."
PORT=10000 NEXT_PUBLIC_API_URL=http://127.0.0.1:8000 node_modules/.bin/next start -p 10000
