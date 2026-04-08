import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question, QuizResult, QuizState } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private mockQuestions: Question[] = [
    {
      id: 1,
      text: 'What is the capital of Thailand?',
      options: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya'],
      correctAnswer: 0
    },
    {
      id: 2,
      text: 'What is the largest planet in our solar system?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 2
    },
    {
      id: 3,
      text: 'Which programming language is primarily used for Angular?',
      options: ['Python', 'JavaScript', 'Java', 'C#'],
      correctAnswer: 1
    },
    {
      id: 4,
      text: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1
    },
    {
      id: 5,
      text: 'Which year did World War II end?',
      options: ['1943', '1944', '1945', '1946'],
      correctAnswer: 2
    }
  ];

  private quizResults: QuizResult[] = [];
  private quizStateSubject = new BehaviorSubject<QuizState>({
    name: '',
    selectedAnswers: {}
  });

  constructor() { }

  getQuestions(): Question[] {
    return this.mockQuestions;
  }

  getQuizState(): Observable<QuizState> {
    return this.quizStateSubject.asObservable();
  }

  getCurrentQuizState(): QuizState {
    return this.quizStateSubject.value;
  }

  setUserName(name: string): void {
    const currentState = this.getCurrentQuizState();
    this.quizStateSubject.next({ ...currentState, name });
  }

  selectAnswer(questionId: number, answerIndex: number): void {
    const currentState = this.getCurrentQuizState();
    const updatedAnswers = { ...currentState.selectedAnswers, [questionId]: answerIndex };
    this.quizStateSubject.next({ ...currentState, selectedAnswers: updatedAnswers });
  }

  submitQuiz(): QuizResult {
    const state = this.getCurrentQuizState();
    let score = 0;

    this.mockQuestions.forEach(question => {
      if (state.selectedAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });

    const result: QuizResult = {
      name: state.name,
      score,
      totalQuestions: this.mockQuestions.length,
      selectedAnswers: state.selectedAnswers,
      timestamp: new Date()
    };

    this.quizResults.push(result);
    return result;
  }

  getQuizResults(): QuizResult[] {
    return this.quizResults;
  }

  resetQuiz(): void {
    this.quizStateSubject.next({
      name: '',
      selectedAnswers: {}
    });
  }

  getLatestResult(): QuizResult | null {
    return this.quizResults.length > 0 ? this.quizResults[this.quizResults.length - 1] : null;
  }
}
