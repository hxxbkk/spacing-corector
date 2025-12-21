import { useState } from 'react';

function App() {
  const [originalText, setOriginalText] = useState('');
  const [checkedText, setCheckedText] = useState('');
  // 1. 다시 단순한 문자열 상태로 되돌립니다.
  const [posTags, setPosTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setCheckedText('');
    setPosTags('');

    try {
      const response = await fetch(
        'https://spacing-corector.onrender.com/check',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: originalText }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCheckedText(data.checked);
        // 2. 서버에서 받은 데이터를 그대로 글자로 넣습니다.
        setPosTags(String(data.pos_tags));
      } else {
        setCheckedText(`오류: ${data.error}`);
      }
    } catch (error) {
      setCheckedText(
        'AI 서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 font-sans text-gray-900">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-6 border border-white">
        <header className="text-center mb-8">
          <div className="inline-block p-3 bg-purple-100 rounded-2xl mb-3 text-3xl">
            ✨
          </div>
          <h1 className="text-2xl font-black text-gray-800">띄어쓰기 교정기</h1>
          <p className="text-sm text-gray-500 mt-1">
            포트폴리오용 지능형 검사기
          </p>
        </header>

        <textarea
          className="w-full h-40 p-4 bg-white border-none rounded-2xl shadow-inner text-gray-700 focus:ring-2 focus:ring-purple-200 outline-none resize-none mb-4"
          placeholder="검사할 내용을 입력하세요..."
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
        />

        <button
          className={`w-full py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleCheck}
          disabled={isLoading}
        >
          {isLoading ? 'AI 분석 중...' : '검사 시작하기'}
        </button>

        {(checkedText || posTags) && (
          <div className="mt-8 space-y-4">
            {checkedText && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-50">
                <h2 className="text-xs font-bold text-purple-400 uppercase mb-2 text-left">
                  교정 결과
                </h2>
                <p className="text-gray-800 font-medium text-left">
                  {checkedText}
                </p>
              </div>
            )}

            {/* 3. 다시 예전처럼 텍스트 형식으로만 보여주는 부분입니다. */}
            {posTags && (
              <div className="bg-purple-50/50 rounded-2xl p-5 border border-dashed border-purple-200">
                <h2 className="text-xs font-bold text-gray-400 uppercase mb-2 text-left">
                  분석 증거 (POS)
                </h2>
                <p className="text-gray-500 text-xs font-mono break-words leading-tight text-left">
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
