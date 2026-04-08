import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly USERS_KEY = 'registered_users';

  constructor() {}

  getUsers(): any[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  saveUser(user: any): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  findUser(username: string): any {
    const users = this.getUsers();
    return users.find(u => u.username === username);
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  removeToken(): void {
    localStorage.removeItem('auth_token');
  }
}
