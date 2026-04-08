import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExamService, CreateExamRequest } from '../../services/exam';

@Component({
  selector: 'app-exam-form',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './exam-form.html',
  styleUrl: './exam-form.css',
})
export class ExamForm {
  examForm: CreateExamRequest = {
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: ''
  };

  constructor(
    private examService: ExamService,
    private router: Router
  ) {}

  saveExam(): void {
    console.log('Saving exam:', this.examForm);
    if (this.isFormValid()) {
      this.examService.createExam(this.examForm).subscribe({
        next: (result) => {
          console.log('Exam saved successfully:', result);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error creating exam:', err);
          console.error('Error details:', err.status, err.statusText);
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  private isFormValid(): boolean {
    return this.examForm.question.trim() !== '' &&
           this.examForm.answer1.trim() !== '' &&
           this.examForm.answer2.trim() !== '' &&
           this.examForm.answer3.trim() !== '' &&
           this.examForm.answer4.trim() !== '';
  }
}
