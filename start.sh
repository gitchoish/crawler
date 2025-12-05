#!/bin/bash

# Backend 시작 (백그라운드)
cd /app/api
uvicorn main:app --host 0.0.0.0 --port 8000 &

# Frontend 시작 (포트 10000)
cd /app/frontend
PORT=10000 NEXT_PUBLIC_API_URL=http://localhost:8000 npm start
