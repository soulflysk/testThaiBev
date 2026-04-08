import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome implements OnInit {
  username: string = '';
  isTokenValid: boolean = false;
  loginTime: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    this.username = this.authService.getCurrentUser() || 'Unknown';
    this.isTokenValid = this.authService.validateToken();
    this.loginTime = new Date().toLocaleString('th-TH');

    if (!this.isTokenValid) {
      this.errorMessage = 'Token is invalid or expired. Please login again.';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    }
  }

  onValidateToken(): void {
    this.isLoading = true;
    this.errorMessage = '';

    setTimeout(() => {
      this.isTokenValid = this.authService.validateToken();
      if (!this.isTokenValid) {
        this.errorMessage = 'Token validation failed. Please login again.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else {
        this.errorMessage = '';
      }
      this.isLoading = false;
    }, 1000);
  }

  onLogout(): void {
    this.authService.logout();
  }
}
