import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExamQuestion {
  id: number;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
}

export interface CreateExamRequest {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private baseUrl = 'http://localhost:5142/api/exam';

  constructor(private http: HttpClient) {}

  getExams(): Observable<ExamQuestion[]> {
    return this.http.get<ExamQuestion[]>(this.baseUrl);
  }

  createExam(exam: CreateExamRequest): Observable<ExamQuestion> {
    return this.http.post<ExamQuestion>(this.baseUrl, exam);
  }

  deleteExam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
