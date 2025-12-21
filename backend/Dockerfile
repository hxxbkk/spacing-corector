# 1. 파이썬 3.9 이미지 사용
FROM python:3.9-slim

# 2. KoNLPy 실행을 위한 Java(JDK) 설치
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk-headless \
    && rm -rf /var/lib/apt-lists/*

# 3. 작업 디렉토리 생성
WORKDIR /app

# 4. 필요한 패키지 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. 백엔드 코드 전체 복사
COPY . .

# 6. 실행 포트 설정 (Render는 기본적으로 10000 포트를 쓰지만, Flask와 맞춤)
EXPOSE 5000

# 7. Gunicorn으로 서버 실행 (app.py의 app 객체 실행)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]