import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ExamService, ExamQuestion } from '../../services/exam';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-exam-list',
  imports: [],
  templateUrl: './exam-list.html',
  styleUrl: './exam-list.css',
})
export class ExamList implements OnInit, OnDestroy {
  exams: ExamQuestion[] = [];
  private routerSubscription: any;

  constructor(
    private examService: ExamService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadExams();
    
    // Listen for navigation events to refresh data when returning to this page
    this.routerSubscription = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadExams();
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  loadExams(): void {
    console.log('Loading exams...');
    this.examService.getExams().subscribe({
      next: (data) => {
        console.log('Exams loaded:', data);
        this.exams = data;
        // Force change detection to update UI
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading exams:', err);
        console.error('Error details:', err.status, err.statusText);
      }
    });
  }

  addExam(): void {
    this.router.navigate(['/exam-form']);
  }

  deleteExam(id: number): void {
    this.examService.deleteExam(id).subscribe({
      next: () => {
        this.loadExams();
      },
      error: (err) => {
        console.error('Error deleting exam:', err);
      }
    });
  }
}
