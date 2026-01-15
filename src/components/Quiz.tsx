import { useState, useEffect } from 'react';
import { QuizItem } from '../types';

interface QuizProps {
  question: QuizItem;
  allQuestions: QuizItem[];
  onAnswer: (selectedAnswer: string) => void;
}

function Quiz({ question, allQuestions, onAnswer }: QuizProps) {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (question) {
      const correctAnswer = question.correctAnswer;
      const distractors = allQuestions
        .filter(q => q.id !== question.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(q => q.correctAnswer);

      const shuffledOptions = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());
      setOptions(shuffledOptions);
    }
  }, [question, allQuestions]);

  const getOptionLabel = (index: number) => String.fromCharCode(65 + index);

  return (
    <div className="w-full max-w-2xl text-center fade-in lg:w-1/2">
      <div className="bg-white p-6 rounded-lg mb-8 shadow-md border border-border">
        <img
          src={question.questionImagePath}
          alt="Quiz question"
          className="mx-auto w-full h-auto max-h-64 object-contain rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        {options.map((option, index) => (
          <button
            key={index}
            className="bg-white/10 text-text border border-primary hover:bg-white/20 font-bold py-4 px-6 rounded-full w-full transition-all duration-200 shadow-md min-h-[64px] focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
            onClick={() => onAnswer(option)}
          >
            {getOptionLabel(index)}. {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;