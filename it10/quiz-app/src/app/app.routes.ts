import { Routes } from '@angular/router';
import { Quiz } from './quiz/quiz';
import { Result } from './result/result';

export const routes: Routes = [
  { path: '', redirectTo: '/quiz', pathMatch: 'full' },
  { path: 'quiz', component: Quiz },
  { path: 'result', component: Result }
];
