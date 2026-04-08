import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onRegister(): Promise<void> {
    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'กรุณากรอกข้อมูลให้ครบทุกช่อง';
      this.successMessage = '';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน';
      this.successMessage = '';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร';
      this.successMessage = '';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const success = await this.authService.register(this.username, this.password);
      if (success) {
        this.successMessage = 'สมัครสมาชิกสำเร็จ! กำลังกลับไปหน้าเข้าสู่ระบบ...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else {
        this.errorMessage = 'ชื่อผู้ใช้นี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น';
      }
    } catch (error) {
      this.errorMessage = 'เกิดข้อผิดพลาดในการสมัครสมาชิก';
    } finally {
      this.isLoading = false;
    }
  }

  onBackToLogin(): void {
    this.router.navigate(['/login']);
  }
}
