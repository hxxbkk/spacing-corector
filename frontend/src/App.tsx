import { useState } from 'react';

// 1. 영어 품사명을 한국어로 바꿔주는 이름표 (컴포넌트 밖으로 이동)
const POS_MAP: { [key: string]: string } = {
  Noun: '명사',
  Josa: '조사',
  Adverb: '부사',
  Adjective: '형용사',
  Verb: '동사',
  Punctuation: '구두점',
  Modifier: '관형사',
  Conjunction: '접속사',
  Exclamation: '감탄사',
  Number: '숫자',
  Foreign: '외국어',
  Alpha: '알파벳',
  Suffix: '접미사',
  Unknown: '미분류',
};

function App() {
  const [originalText, setOriginalText] = useState('');
  const [checkedText, setCheckedText] = useState('');
  // 품사 정보를 배열 형태로 저장하기 위해 초기값을 null로 설정합니다.
  const [posTags, setPosTags] = useState<[string, string][] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setCheckedText('');
    setPosTags(null);

    try {
      const response = await fetch(
        'https://spacing-corector.onrender.com/check',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: originalText }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCheckedText(data.checked);
        // 서버에서 받아온 [단어, 품사] 배열을 상태에 저장합니다.
        setPosTags(data.pos_tags);
      } else {
        setCheckedText(`오류: ${data.error}`);
      }
    } catch (error) {
      console.error('서버 통신 오류:', error);
      setCheckedText(
        'AI 서버에 연결할 수 없습니다. (서버가 깨어나는 중일 수 있으니 1분 뒤 다시 시도해 주세요!)'
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
          <h1 className="text-2xl font-black tracking-tight text-gray-800">
            지능형 띄어쓰기 교정기
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            AI 형태소 분석 기반 맞춤법 검사
          </p>
        </header>

        <div className="relative mb-4">
          <textarea
            className="w-full h-40 p-4 bg-white border-none rounded-2xl shadow-inner text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-200 outline-none resize-none transition-all"
            placeholder={
              '검사할 내용을 입력하세요...\n(예: 아버지가방에들어가신다)'
            }
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
          />
        </div>

        <button
          className={`w-full py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-purple-200 active:scale-95 transition-all
                     ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleCheck}
          disabled={isLoading}
        >
          {isLoading ? 'AI 분석 중...' : '검사 시작하기'}
        </button>

        {(checkedText || posTags) && (
          <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* 1. 교정 결과 영역 */}
            {checkedText && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-50">
                <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
                  교정 결과
                </h2>
                <p className="text-gray-800 font-semibold text-lg leading-relaxed">
                  {checkedText}
                </p>
              </div>
            )}

            {/* 2. 한국어 품사 태깅 영역 (개선된 디자인) */}
            {posTags && (
              <div className="bg-purple-50/50 rounded-2xl p-5 border border-dashed border-purple-200">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  AI 분석 증거 (품사 태깅)
                </h2>
                <div className="flex flex-wrap gap-2">
                  {posTags.map(([word, tag], index) => (
                    <div
                      key={index}
                      className="inline-flex items-center bg-white px-2 py-1 rounded-lg border border-purple-100 shadow-sm"
                    >
                      <span className="text-sm font-bold text-gray-700">
                        {word}
                      </span>
                      <span className="ml-1.5 text-[10px] text-purple-500 font-medium bg-purple-50 px-1 rounded border border-purple-100">
                        {POS_MAP[tag] || tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <footer className="mt-8 text-center text-[10px] text-gray-400">
          © 2025 AI Korean Spacing Project · Powered by KoNLPy
        </footer>
      </div>
    </div>
  );
}

export default App;
