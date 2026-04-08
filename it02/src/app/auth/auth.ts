import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async register(username: string, password: string): Promise<boolean> {
    try {
      const existingUser = this.storageService.findUser(username);
      if (existingUser) {
        return false;
      }

      const user = {
        username,
        password, // Plain text for now - will add bcrypt later
        createdAt: new Date()
      };

      this.storageService.saveUser(user);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const user = this.storageService.findUser(username);
      if (!user) {
        return false;
      }

      const isPasswordValid = user.password === password; // Simple comparison for now
      if (!isPasswordValid) {
        return false;
      }

      this.storageService.saveToken('simple-token-' + username);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  validateToken(): boolean {
    try {
      const token = this.storageService.getToken();
      return !!token;
    } catch (error) {
      console.error('Token validation error:', error);
      this.storageService.removeToken();
      return false;
    }
  }

  getCurrentUser(): string | null {
    try {
      const token = this.storageService.getToken();
      if (!token) {
        return null;
      }

      // Extract username from simple token format
      if (token.startsWith('simple-token-')) {
        return token.replace('simple-token-', '');
      }
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  logout(): void {
    this.storageService.removeToken();
    this.router.navigate(['/login']);
  }
}
