# 1. 더 안정적인 파이썬 이미지 사용 (slim 제거)
FROM python:3.9

# 2. 필수 패키지 업데이트 및 Java 설치 (가장 안정적인 default-jdk 사용)
RUN apt-get update && apt-get install -y \
    default-jdk \
    && apt-get clean

# 3. 작업 디렉토리 설정
WORKDIR /app

# 4. 패키지 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. 소스 코드 복사
COPY . .

# 6. 포트 설정 및 서버 실행
EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]

# 7. 실행 설정 변경: 일꾼을 1개로 제한하고 타임아웃을 늘립니다.
# --workers 1: 메모리 절약을 위해 일꾼을 하나만 둡니다.
# --timeout 120: AI 분석이 오래 걸려도 서버가 꺼지지 않게 기다려줍니다.
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "1", "--threads", "1", "--timeout", "120", "app:app"]