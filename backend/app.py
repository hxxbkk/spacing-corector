from flask import Flask, request, jsonify
from konlpy.tag import Okt
import logging

# 1. Flask('웨이터')와 KoNLPy('요리사') 준비
app = Flask(__name__)
okt = Okt()

# 2. CORS 설정 (매우 중요!)
# React(다른 동네)에서 오는 주문을 받을 수 있게 허용해 줍니다.
from flask_cors import CORS
CORS(app) 

# 3. '/check'라는 주소로 '주문(POST)'이 오면 이 함수를 실행
@app.route('/check', methods=['POST'])
def check_spelling():
    try:
        # 손님(React)이 보낸 '주문서(JSON)'에서 'text' 내용물 꺼내기
        data = request.json
        original_text = data['text']

        pos_tags = okt.pos(original_text)
        checked_text = ""
        for i, (word, pos) in enumerate(pos_tags):
         if i== 0:   
            checked_text += word
            continue
        
         if pos in ['Josa', 'Eomi', 'Punctuation']:
             checked_text += word
         else:
             checked_text += " " + word
            
         pos_result = [f"('{word}', '{pos})" for word, pos in pos_tags]


        # 요리(결과)를 손님(React)에게 돌려주기
        return jsonify({
            'original': original_text,
            'checked': checked_text,
            'pos_tags': " ".join(pos_result)
        })

    except Exception as e:
        logging.error(f"Error processing request: {e}")
        return jsonify({'error': str(e)}), 500

# 4. '웨이터(Flask)'가 주문을 받기 시작 (서버 실행)
if __name__ == '__main__':
    print("AI 서버(Flask)가 5000번 포트에서 실행 중입니다...")
    app.run(debug=True, port=5000)