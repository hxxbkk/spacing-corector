import React, { useState } from 'react';

function App() {
  // 1. React가 '입력창'의 텍스트를 기억하게 함 (useState)
  const [originalText, setOriginalText] = useState('');

  // 2. '결과창'의 텍스트를 기억하게 함
  const [checkedText, setCheckedText] = useState('');

  const [posTags, setPostTags] = useState('');

  // 버튼 중복 클릭 방지용
  const [isLoading, setIsLoading] = useState(false);

  // 3. '검사하기' 버튼을 눌렀을 때 실행될 함수
  const handleCheck = async () => {
    // 이미 로딩 중이면 (버튼 또 누르면) 무시
    if (isLoading) return;

    setIsLoading(true);
    setCheckedText('');
    setPostTags('');

    // 백엔드(AI 서버)와 통신 시작!
    try {
      const response = await fetch(
        'https://spacing-corector.onrender.com/check',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: originalText }), // 입력창 텍스트를 AI 서버로 전송
        }
      );

      const data = await response.json();

      if (response.ok) {
        // AI 서버가 보내준 결과를 '결과창'에 업데이트
        setCheckedText(data.checked);
        setPostTags(data.pos_tags);
      } else {
        // AI 서버가 에러를 보낸 경우
        setCheckedText(`오류: ${data.error}`);
      }
    } catch (error) {
      console.error('서버 통신 오류:', error);
      setCheckedText(
        'AI 서버에 연결할 수 없습니다. (혹시 서버를 안 켜셨나요?)'
      );
    } finally {
      setIsLoading(false); // 로딩 끝
    }
  };

  return (
    /* 1. 배경: 하늘색-보라색-핑크색 파스텔 그라데이션 */
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 font-sans">
      {/* 2. 웹앱 컨테이너: 모바일에서는 꽉 차고, PC에서는 적당한 크기 (max-w-md) */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-6 border border-white">
        {/* 3. 헤더: 귀여운 파스텔 아이콘 느낌 */}
        <header className="text-center mb-8">
          <div className="inline-block p-3 bg-purple-100 rounded-2xl mb-3">
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            띄어쓰기 교정기
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            포트폴리오용 지능형 검사기
          </p>
        </header>

        {/* 4. 입력창: 부드러운 라운딩과 연한 보라색 포커스 */}
        <div className="relative mb-4">
          <textarea
            className="w-full h-40 p-4 bg-white border-none rounded-2xl shadow-inner text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-200 outline-none resize-none transition-all"
            placeholder={
              '검사할 내용을 입력하세요...\n(예시 : 아버지가방에들어가신다)'
            }
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
          />
        </div>

        {/* 5. 버튼: 보라색 파스텔 그라데이션 + 둥글둥글한 디자인 */}
        <button
          className={`w-full py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-purple-200 active:scale-95 transition-all
                      ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleCheck}
          disabled={isLoading}
        >
          {isLoading ? 'AI 분석 중...' : '검사 시작하기'}
        </button>

        {/* 6. 결과창: 말풍선 같은 부드러운 디자인 */}
        {(checkedText || posTags) && (
          <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* 교정 결과 블록 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-50">
              <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
                교정 결과
              </h2>
              <p className="text-gray-800 font-medium leading-relaxed">
                {checkedText}
              </p>
            </div>

            {/* 품사 태깅 블록 (더 연한 스타일) */}
            {posTags && (
              <div className="bg-purple-50/50 rounded-2xl p-5 border border-dashed border-purple-200">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  분석 증거 (POS)
                </h2>
                <p className="text-gray-500 text-xs font-mono break-words leading-tight">
                  {posTags}
                </p>
              </div>
            )}
          </div>
        )}

        <footer className="mt-8 text-center text-[10px] text-gray-300">
          © 2025 AI Auto-Correction Project
        </footer>
      </div>
    </div>
  );
}

export default App;
