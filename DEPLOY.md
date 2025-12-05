# 배포 가이드

## 🚀 배포 순서

### 1. GitHub 저장소 생성 및 푸시

```bash
# Git 초기화 (이미 되어있다면 스킵)
git init

# 원격 저장소 추가
git remote add origin https://github.com/YOUR_USERNAME/naver-review-crawler.git

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: Naver Review Crawler Web Service"

# 푸시
git push -u origin main
```

---

### 2. Backend 배포 (Render.com)

1. **Render.com 가입**: https://render.com

2. **New Web Service 클릭**

3. **GitHub 연결** 후 저장소 선택

4. **설정**:
   - Name: `naver-review-crawler-api`
   - Root Directory: (비워두기)
   - Environment: `Docker`
   - Dockerfile Path: `./Dockerfile`
   
5. **환경 변수 추가**:
   - `ALLOWED_ORIGINS`: (나중에 Vercel URL로 업데이트)

6. **Create Web Service** 클릭

7. 배포 완료 후 URL 복사 (예: `https://naver-review-crawler-api.onrender.com`)

---

### 3. Frontend 배포 (Vercel)

1. **Vercel 가입**: https://vercel.com

2. **New Project** 클릭

3. **GitHub 연결** 후 저장소 선택

4. **설정**:
   - Framework Preset: `Next.js`
   - Root Directory: `frontend`

5. **환경 변수 추가**:
   - `NEXT_PUBLIC_API_URL`: Render에서 받은 Backend URL
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: (AdSense ID, 선택)

6. **Deploy** 클릭

---

### 4. CORS 설정 업데이트

Backend 배포 후, Render.com에서 환경 변수 업데이트:
- `ALLOWED_ORIGINS`: Vercel에서 받은 Frontend URL

---

## 📝 환경 변수 요약

### Backend (Render.com)
| 변수명 | 값 |
|--------|-----|
| ALLOWED_ORIGINS | https://your-app.vercel.app |

### Frontend (Vercel)
| 변수명 | 값 |
|--------|-----|
| NEXT_PUBLIC_API_URL | https://your-api.onrender.com |
| NEXT_PUBLIC_ADSENSE_CLIENT_ID | ca-pub-XXXXXXXX (선택) |

---

## ⚠️ 주의사항

1. **Render.com 무료 플랜**:
   - 15분 비활성 시 슬립 모드
   - 첫 요청 시 30초~1분 대기 시간

2. **Vercel 무료 플랜**:
   - 월 100GB 대역폭
   - Serverless 함수 제한

3. **크롤링 제한**:
   - 프로덕션에서는 Rate Limiting 필수
   - 네이버 정책 준수 필요
