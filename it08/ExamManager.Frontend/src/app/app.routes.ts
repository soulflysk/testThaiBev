import { Routes } from '@angular/router';
import { ExamList } from './components/exam-list/exam-list';
import { ExamForm } from './components/exam-form/exam-form';

export const routes: Routes = [
  { path: '', component: ExamList },
  { path: 'exam-form', component: ExamForm },
  { path: '**', redirectTo: '' }
];
