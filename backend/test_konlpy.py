from konlpy.tag import Okt
okt = Okt()

text = "아버지가방에들어가신다"

# 1. 형태소 분석 (AI의 핵심)
morphs = okt.morphs(text)
print(f"형태소 분석: {morphs}")

# 2. AI 기반 띄어쓰기
spaced_text = " ".join(morphs)
print(f"띄어쓰기 교정: {spaced_text}")

# 3. 품사 태깅 (AI 포트폴리오의 꽃)
pos_text = okt.pos(text)
print(f"품사 태깅: {pos_text}")