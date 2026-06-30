# ✨ 한국어 띄어쓰기 교정기 (Korean Spacing Checker)

> **KoNLPy의 Okt 형태소 분석기를 활용한 한국어 띄어쓰기 교정 웹앱입니다.**
> 형태소 분석 결과를 기반으로 조사, 어미, 구두점 등을 구분하여 규칙 기반으로 자연스러운 띄어쓰기를 적용했습니다.

---

# 🔗 Live Demo

* **Web App (Frontend)**
  https://spacing-corector.vercel.app

* **API Server (Backend)**
  https://spacing-corector.onrender.com

> **Note**
> Render 무료 플랜 특성상 서버가 절전 상태에 있을 수 있어 첫 요청 시 약 50초~1분 정도의 응답 지연이 발생할 수 있습니다.

---

# 🚀 프로젝트 개요

* **개발 기간:** 2025.12
* **목적:** KoNLPy 형태소 분석기를 활용한 한국어 텍스트 처리 웹 서비스 구현
* **주요 기능**

  * 한국어 띄어쓰기 보정
  * 형태소 및 품사(POS) 분석 결과 제공
  * 교정 결과 복사

---

# 🛠 기술 스택

## Frontend

* React
* TypeScript
* Tailwind CSS
* Vercel

## Backend

* Flask
* KoNLPy (Okt)
* Flask-CORS
* Docker
* Render

---

# ✨ 주요 기능

## 1. 형태소 분석 기반 띄어쓰기 보정

KoNLPy의 Okt 형태소 분석기를 이용해 문장을 형태소 단위로 분석한 뒤, 품사에 따라 공백 처리 규칙을 적용했습니다.

* 조사(Josa): 앞 단어와 붙여쓰기
* 어미(Eomi): 앞 단어와 붙여쓰기
* 구두점(Punctuation): 앞 단어와 붙여쓰기
* 그 외 품사: 단어 사이 공백 추가

이를 통해 형태소를 단순히 띄어 쓰는 방식보다 자연스러운 결과를 얻을 수 있도록 구현했습니다.

---

## 2. 형태소 분석 결과 제공

교정 결과와 함께 형태소 분석 및 품사(POS) 태깅 결과를 화면에 표시하여 문장이 어떤 형태소로 분석되었는지 확인할 수 있도록 구현했습니다.

---

# 🛠 트러블슈팅

## 1. 제한된 메모리 환경에서의 서버 안정성 개선

Render 무료 플랜 환경에서 KoNLPy를 안정적으로 실행하기 위해 Docker 기반 실행 환경을 구성했습니다.

Gunicorn 실행 시 워커와 스레드를 각각 1개로 제한하여 메모리 사용량을 줄였으며, 처리 시간이 긴 요청을 고려해 timeout을 120초로 설정했습니다.

## 2. CORS 설정

Frontend(Vercel)와 Backend(Render)가 서로 다른 도메인에서 동작하기 때문에 `Flask-CORS`를 적용하여 API 통신이 가능하도록 구성했습니다.

---

# 🏃 실행 방법

## Backend

```bash
cd backend

docker build -t spacing-backend .
docker run -p 5000:5000 spacing-backend
```

## Frontend

```bash
cd frontend

npm install
npm run dev
```
