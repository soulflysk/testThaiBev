import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IT04Model {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  sex: string;
  birthDay: string;
  occupation: string;
  profile: string;
}

export interface SaveResponse {
  success: boolean;
  message: string;
  id: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface SaveErrorResponse {
  success: boolean;
  errors: ValidationError[];
}

@Injectable({
  providedIn: 'root'
})
export class It04Service {
  private apiUrl = 'http://localhost:5000/api/IT04';

  constructor(private http: HttpClient) { }

  saveData(data: IT04Model): Observable<SaveResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<SaveResponse>(`${this.apiUrl}/save`, data, { headers });
  }

  getAllData(): Observable<IT04Model[]> {
    return this.http.get<IT04Model[]>(`${this.apiUrl}/data`);
  }
}
