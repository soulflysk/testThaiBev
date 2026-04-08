import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { Question, QuizState } from '../models/quiz.model';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz implements OnInit {
  questions: Question[] = [];
  quizState: QuizState = { name: '', selectedAnswers: {} };
  userName: string = '';

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questions = this.quizService.getQuestions();
    this.quizService.getQuizState().subscribe(state => {
      this.quizState = state;
    });
  }

  startQuiz(): void {
    if (this.userName.trim()) {
      this.quizService.setUserName(this.userName.trim());
    }
  }

  selectAnswer(questionId: number, answerIndex: number): void {
    this.quizService.selectAnswer(questionId, answerIndex);
  }

  isQuizComplete(): boolean {
    return this.questions.every(question => 
      this.quizState.selectedAnswers[question.id] !== undefined
    );
  }

  submitQuiz(): void {
    if (this.isQuizComplete()) {
      const result = this.quizService.submitQuiz();
      this.router.navigate(['/result']);
    }
  }
}
