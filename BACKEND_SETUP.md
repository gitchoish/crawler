# 백엔드 서버 실행 가이드

## 문제 상황
Python 환경 설정 이슈로 자동 실행이 되지 않습니다.

## 해결 방법

### 방법 1: 새 터미널에서 직접 실행

1. **새 PowerShell 터미널 열기**

2. **API 디렉토리로 이동**
```powershell
cd c:\Users\shchoi\Desktop\naver_crawling\api
```

3. **가상환경 활성화 (있는 경우)**
```powershell
.\venv\Scripts\Activate.ps1
```

4. **서버 실행**
```powershell
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 방법 2: 직접 Python 파일 실행

```powershell
cd c:\Users\shchoi\Desktop\naver_crawling\api
python main.py
```

### 방법 3: 의존성 재설치 후 실행

```powershell
cd c:\Users\shchoi\Desktop\naver_crawling\api
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## 확인 사항

서버가 정상 실행되면 다음과 같은 메시지가 표시됩니다:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

그 후 브라우저에서:
- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/docs

## 현재 상태
✅ Frontend: 정상 실행 중 (http://localhost:3000)
⚠️ Backend: 수동 실행 필요
