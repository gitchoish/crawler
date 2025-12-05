# Python 환경 설정 가이드

## 문제 진단

현재 시스템에서 Python 명령어가 제대로 작동하지 않고 있습니다.

## 해결 방법

### 1. Python 설치 확인

**방법 A: Python Launcher 사용**
```powershell
py --version
py -m pip --version
```

**방법 B: 직접 Python 경로 확인**
- Windows 검색에서 "Python" 검색
- Python 설치 경로 확인 (예: `C:\Python311\python.exe`)

### 2. 백엔드 실행 (Python Launcher 사용)

```powershell
cd c:\Users\shchoi\Desktop\naver_crawling\api
py -m pip install -r requirements.txt
py -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Python 재설치 (권장)

1. **Python 공식 사이트에서 다운로드**
   - https://www.python.org/downloads/
   - "Download Python 3.11" 클릭

2. **설치 시 중요 옵션**
   - ✅ "Add Python to PATH" 체크박스 선택
   - "Install Now" 클릭

3. **설치 확인**
   ```powershell
   python --version
   pip --version
   ```

### 4. 대안: Anaconda 사용

Anaconda를 사용하는 경우:
```powershell
conda activate base
cd c:\Users\shchoi\Desktop\naver_crawling\api
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## 임시 해결책: 프론트엔드만 사용

백엔드 없이도 프론트엔드 UI는 확인 가능합니다:
- http://localhost:3000

실제 크롤링 기능을 사용하려면 백엔드가 필요합니다.

## 성공 확인

백엔드가 정상 실행되면:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
🚀 API 서버가 시작되었습니다
📂 다운로드 디렉토리: downloads/
INFO:     Application startup complete.
```

이런 메시지가 표시됩니다.

## 도움이 필요하면

1. Python 버전 확인: `py --version` 또는 `python --version`
2. 설치된 패키지 확인: `py -m pip list` 또는 `pip list`
3. 에러 메시지 전체 복사해서 공유
