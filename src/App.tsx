import { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { QuizItem } from './types';

// This interface matches the structure of your icon_mapping.json
interface RawQuizData {
  id: number;
  label: string;
  filename: string;
}

// Interface for storing results of each question
interface QuestionResult {
  quizItem: QuizItem;
  isCorrect: boolean;
  userAnswer: string; // Store user's answer for review
}

function App() {
  const [gameState, setGameState] = useState<'start' | 'quiz' | 'results'>('start');
  const [questions, setQuestions] = useState<QuizItem[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quizResults, setQuizResults] = useState<QuestionResult[]>([]); // New state for detailed results

  useEffect(() => {
    fetch('/icon_mapping.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((rawData: RawQuizData[]) => {
        if (rawData && rawData.length > 0) {
          const transformedData: QuizItem[] = rawData.map(item => ({
            id: item.id,
            correctAnswer: item.label,
            questionImagePath: `/quiz_icons/icon_${item.id}.png`, 
            answerImagePath: `/answer_icons/${item.filename}`,
          }));

          const shuffledData = transformedData.sort(() => Math.random() - 0.5);
          setQuestions(shuffledData);
        } else {
          throw new Error('No questions found in data file.');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to load or transform quiz data:", error);
        setError('測驗資料載入或處理失敗。請確認 `public` 資料夾中的檔案結構與內容是否正確。');
        setLoading(false);
      });
  }, []);

  const handleStart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizResults([]); // Clear previous results
    setGameState('quiz');
  };

  const handleAnswer = (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    // Record the result for this question
    setQuizResults(prevResults => [
      ...prevResults,
      { quizItem: currentQuestion, isCorrect, userAnswer: selectedAnswer }
    ]);

    // Move to the next question or end the quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setGameState('results');
    }
  };
  
  const handleRestart = () => {
    setQuestions(prevQuestions => [...prevQuestions].sort(() => Math.random() - 0.5)); // Re-shuffle
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizResults([]); // Clear results on restart
    setGameState('start');
  };

  const renderContent = () => {
    if (loading) {
      return <p className="text-xl">載入中...</p>;
    }
    if (error) {
      return <p className="text-xl text-red-500 max-w-md text-center">{error}</p>;
    }
    
    switch (gameState) {
      case 'quiz':
        return (
          <Quiz 
            question={questions[currentQuestionIndex]}
            allQuestions={questions}
            onAnswer={handleAnswer}
          />
        );
      case 'results':
        return (
          <Results 
            score={score}
            totalQuestions={questions.length}
            results={quizResults} // Pass detailed results
            onRestart={handleRestart}
          />
        );
      case 'start':
      default:
        return <StartScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary">怪手儀表板圖示測驗</h1>
      {renderContent()}
    </div>
  );
}

export default App;