export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  name: string;
  score: number;
  totalQuestions: number;
  selectedAnswers: { [key: number]: number };
  timestamp: Date;
}

export interface QuizState {
  name: string;
  selectedAnswers: { [key: number]: number };
}
