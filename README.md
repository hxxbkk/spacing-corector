# ✨ AI 띄어쓰기 교정기 (AI Korean Spacing Corrector)

> **KoNLPy의 형태소 분석 기능을 활용한 지능형 한국어 띄어쓰기 교정 웹앱입니다.**
> 단순히 문장을 쪼개는 것이 아니라, 품사(POS)를 분석하여 조사와 어미를 구분해 자연스러운 띄어쓰기를 구현했습니다.

---

## 🔗 Live Demo
* **Web App (Frontend):** [https://spacing-corector.vercel.app](https://spacing-corector.vercel.app)
* **API Server (Backend):** [https://spacing-corector.onrender.com](https://spacing-corector.onrender.com)
> **Note:** Render 무료 플랜 특성상 서버가 잠들 수 있어, 첫 실행 시 약 50초~1분 정도의 대기 시간이 발생할 수 있습니다.

---

## 🚀 프로젝트 개요
* **개발 기간:** 2025.12
* **목적:** AI 모델(KoNLPy)을 웹 서비스와 연결하여 실무적인 AI 포트폴리오 구축
* **주요 기능:** 지능형 띄어쓰기 교정, 품사 태깅 결과 시각화, 교정 결과 복사

## 🛠 기술 스택 (Tech Stack)

### 🎨 Frontend
* **React (TypeScript):** 안정적인 컴포넌트 개발 및 타입 정의
* **Tailwind CSS:** 파스텔톤의 모던하고 반응형인 UI 디자인 구현
* **Deployment:** Vercel (CI/CD 자동화)

### 🧠 Backend
* **Flask:** 가벼운 Python 마이크로 웹 프레임워크
* **KoNLPy (Okt):** 형태소 분석 및 품사 태깅(POS Tagging) 엔진
* **Docker:** 일관된 Java/Python 실행 환경 구축
* **Deployment:** Render (Docker 기반 배포)

---

## ✨ 핵심 기능 및 구현 상세

### 1. 지능형 띄어쓰기 알고리즘
단순한 형태소 분리에서 발생하는 어색한 띄어쓰기(예: '가방 에')를 해결하기 위해 품사 기반 규칙을 적용했습니다.
* **조사(Josa), 어미(Eomi), 구두점(Punctuation):** 앞 단어에 붙여쓰기 로직 구현
* **그 외 품사:** 단어 간 적절한 공백 추가

### 2. AI 분석 증거 시각화
사용자가 AI가 어떻게 문장을 분석했는지 확인할 수 있도록 형태소 분석 결과를 실시간으로 노출하여 서비스의 투명성을 높였습니다.

---

## 🛠 실전 트러블슈팅 (Issue Solving)

### 1. 제한된 메모리 환경에서의 OOM(Out of Memory) 해결
Render 무료 플랜(512MB RAM)에서 KoNLPy(JVM 기반) 구동 시 `SIGKILL` 에러가 발생하는 문제를 해결했습니다.
* **해결책:** - Gunicorn 워커 및 스레드 수를 1개로 제한하여 오버헤드 최소화
  - Java 옵션(`-Xmx256m`)을 통해 JVM의 최대 메모리 점유율을 강제로 제한
  - `--preload` 옵션을 통해 서버 시작 시 모델을 미리 로딩하여 런타임 안정성 확보

### 2. 크로스 도메인 통신(CORS) 설정
Vercel(Frontend)과 Render(Backend) 간의 원활한 데이터 통신을 위해 `flask-cors`를 활용하여 보안 정책을 설정하고 통신 에러를 해결했습니다.

---

## 🏃 실행 방법 (Local)

### Backend
```bash
cd backend
# Docker를 사용하는 경우
docker build -t spacing-backend .
docker run -p 5000:5000 spacing-backend
```

### frontend
```bash
cd frontend
npm install
npm run dev
```
