import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { QuizResult, Question } from '../models/quiz.model';

@Component({
  selector: 'app-result',
  imports: [CommonModule, DatePipe],
  templateUrl: './result.html',
  styleUrl: './result.css',
})
export class Result implements OnInit {
  result: QuizResult | null = null;
  questions: Question[] = [];
  showDetails: boolean = false;
  percentage: number = 0;

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.result = this.quizService.getLatestResult();
    this.questions = this.quizService.getQuestions();
    
    if (this.result) {
      this.percentage = Math.round((this.result.score / this.result.totalQuestions) * 100);
    }
  }

  isCorrect(questionId: number, questionIndex: number): boolean {
    if (!this.result) return false;
    const userAnswer = this.result.selectedAnswers[questionId];
    return userAnswer === this.questions[questionIndex].correctAnswer;
  }

  getUserAnswer(questionId: number): string {
    if (!this.result) return 'Not answered';
    const answerIndex = this.result.selectedAnswers[questionId];
    const question = this.questions.find(q => q.id === questionId);
    
    if (answerIndex === undefined || !question) {
      return 'Not answered';
    }
    
    return question.options[answerIndex] || 'Not answered';
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  takeQuizAgain(): void {
    this.quizService.resetQuiz();
    this.router.navigate(['/quiz']);
  }

  goToQuiz(): void {
    this.router.navigate(['/quiz']);
  }
}
