from flask import Flask, request, jsonify
from flask_cors import CORS
from konlpy.tag import Okt
import logging
import os

app = Flask(__name__)

# 모든 도메인(*)에서 오는 요청을 허용하여 Vercel과의 통신 에러를 방지합니다.
CORS(app, resources={r"/*": {"origins": "*"}})

okt = Okt()

@app.route('/check', methods=['POST'])
def check_spelling():
    try:
        data = request.json
        original_text = data['text']

        pos_tags = okt.pos(original_text)
        checked_text = ""
        
        # 1. 띄어쓰기 교정 로직
        for i, (word, pos) in enumerate(pos_tags):
            if i == 0:   
                checked_text += word
                continue
            
            # 조사, 어미, 구두점은 앞 단어에 붙여씀
            if pos in ['Josa', 'Eomi', 'Punctuation']:
                checked_text += word
            else:
                checked_text += " " + word
        
        # 2. 형태소 분석 결과 생성 (반복문 밖으로 이동하여 효율성 높임)
        pos_result = [f"('{word}', '{pos}')" for word, pos in pos_tags]

        return jsonify({
            'original': original_text,
            'checked': checked_text,
            'pos_tags': " ".join(pos_result)
        })

    except Exception as e:
        logging.error(f"Error processing request: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Render 환경에서 포트를 자동으로 할당받도록 설정
    print("AI 서버(Flask)가 실행 중입니다...")
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)