export interface QuizItem {
  id: number;
  questionImagePath: string;
  answerImagePath: string;
  correctAnswer: string;
}

export interface QuestionResult {
  quizItem: QuizItem;
  isCorrect: boolean;
  userAnswer: string;
}