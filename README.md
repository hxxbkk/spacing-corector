# ✨ AI 띄어쓰기 교정기 (AI Korean Spacing Corrector)

> **KoNLPy의 형태소 분석 기능을 활용한 지능형 한국어 띄어쓰기 교정 웹앱입니다.**
> 단순히 문장을 쪼개는 것이 아니라, 품사(POS)를 분석하여 조사와 어미를 구분해 자연스러운 띄어쓰기를 구현했습니다.

---

## 🚀 프로젝트 개요
* **개발 기간:** 2025.12
* **목적:** AI 모델(KoNLPy)을 웹 서비스와 연결하여 실무적인 AI 포트폴리오 구축
* **주요 기능:** 지능형 띄어쓰기 교정, 품사 태깅 결과 시각화, 교정 결과 복사

## 🛠 기술 스택 (Tech Stack)

### 🎨 Frontend
* **React (TypeScript):** 안정적인 컴포넌트 개발 및 타입 정의
* **Tailwind CSS:** 파스텔톤의 모던하고 반응형인 UI 디자인 구현
* **Lucide-react:** 직관적인 사용자 경험(UX)을 위한 아이콘 라이브러리

### 🧠 Backend
* **Flask:** 가벼운 Python 마이크로 웹 프레임워크
* **KoNLPy (Okt):** 형태소 분석 및 품사 태깅(POS Tagging) 엔진
* **Flask-CORS:** 프론트엔드와 백엔드 간의 원활한 통신 설정

---

## ✨ 핵심 기능 및 구현 상세

### 1. 지능형 띄어쓰기 알고리즘
단순한 형태소 분리에서 발생하는 어색한 띄어쓰기(예: '가방 에')를 해결하기 위해 품사 기반 규칙을 적용했습니다.
* **조사(Josa), 어미(Eomi), 구두점(Punctuation):** 앞 단어에 붙여쓰기 로직 구현
* **그 외 품사:** 단어 간 적절한 공백 추가

### 2. AI 분석 증거 시각화
사용자가 AI가 어떻게 문장을 분석했는지 확인할 수 있도록 형태소 분석 결과를 실시간으로 노출하여 서비스의 투명성을 높였습니다.

### 3. 사용자 친화적 UX/UI
* **반응형 디자인:** 모바일과 PC 모두에 최적화된 웹앱 레이아웃
* **로딩 피드백:** AI 분석 중 스피너 애니메이션 제공
* **원클릭 복사:** 교정된 문장을 바로 사용할 수 있는 클립보드 복사 기능

---

## 🏃 실행 방법 (Local)

### Backend
```bash
cd backend
conda activate koreanspell
python app.py# spacing-corector
```

### frontend
```bash
cd frontend
npm install
npm run dev
```
