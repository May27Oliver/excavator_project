import { QuestionResult } from '../types';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  results: QuestionResult[]; // Updated to QuestionResult[]
  onRestart: () => void;
}

function Results({ score, totalQuestions, results, onRestart }: ResultsProps) {
  return (
    <div className="w-full max-w-4xl text-center fade-in pt-16">
      <h2 className="text-3xl font-bold mb-4 text-primary">測驗結束！</h2>
      <p className="text-xl mb-8">您的分數是: {score} / {totalQuestions}</p>

      <button
        className="bg-cta hover:brightness-110 text-white font-bold py-3 px-6 rounded-xl text-xl mb-12 transition-all duration-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-cta focus:ring-opacity-50"
        onClick={onRestart}
      >
        重新開始
      </button>

      <h3 className="text-2xl font-bold mb-6 text-primary">答案解析</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <div key={result.quizItem.id} className="bg-white p-4 rounded-lg shadow-lg text-text border border-border">
            <div className="flex items-center mb-2">
              {result.isCorrect ? (
                <span className="text-green-500 text-2xl mr-2">✅</span>
              ) : (
                <span className="text-red-500 text-2xl mr-2">❌</span>
              )}
              <p className={`font-semibold ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {result.userAnswer}
              </p>
            </div>
            <img
              src={result.quizItem.answerImagePath}
              alt={result.quizItem.correctAnswer}
              className="w-full h-auto rounded-md mb-2 object-contain max-h-40"
            />
            {!result.isCorrect && (
              <p className="text-red-500 text-sm">正確答案: {result.quizItem.correctAnswer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
