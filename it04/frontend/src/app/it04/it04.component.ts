import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { It04Service, IT04Model, SaveResponse } from '../services/it04.service';

@Component({
  selector: 'app-it04',
  templateUrl: './it04.component.html',
  styleUrls: ['./it04.component.scss']
})
export class It04Component implements OnInit {
  it04Form: FormGroup = this.fb.group({});
  occupations = [
    'Software Developer',
    'Designer',
    'Project Manager',
    'Business Analyst',
    'Data Scientist',
    'Marketing Manager',
    'Sales Representative',
    'HR Manager',
    'Accountant',
    'Teacher'
  ];
  
  saveMessage: string = '';
  savedId: string = '';
  profileImageBase64: string = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private it04Service: It04Service) { }

  ngOnInit() {
    this.it04Form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      sex: ['', Validators.required],
      birthDay: ['', [Validators.required, this.dateValidator]],
      occupation: ['', Validators.required],
      profile: ['', Validators.required]
    });
  }

  dateValidator(control: any): { [key: string]: any } | null {
    const value = control.value;
    if (!value) return null;
    
    const datePattern = /^([0-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!datePattern.test(value)) {
      return { invalidDateFormat: true };
    }
    
    return null;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImageBase64 = e.target.result;
        this.it04Form.patchValue({ profile: this.profileImageBase64 });
      };
      reader.readAsDataURL(file);
    }
  }

  onSave() {
    if (this.it04Form.valid) {
      this.isLoading = true;
      
      const formData: IT04Model = {
        firstName: this.it04Form.get('firstName')?.value || '',
        lastName: this.it04Form.get('lastName')?.value || '',
        email: this.it04Form.get('email')?.value || '',
        phone: this.it04Form.get('phone')?.value || '',
        sex: this.it04Form.get('sex')?.value || '',
        birthDay: this.it04Form.get('birthDay')?.value || '',
        occupation: this.it04Form.get('occupation')?.value || '',
        profile: this.it04Form.get('profile')?.value || ''
      };

      this.it04Service.saveData(formData).subscribe({
        next: (response: SaveResponse) => {
          if (response.success) {
            this.savedId = response.id;
            this.saveMessage = response.message;
            
            // Clear form after 3 seconds
            setTimeout(() => {
              this.onClear();
            }, 3000);
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Save error:', error);
          this.saveMessage = 'Error occurred while saving data';
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.it04Form);
    }
  }

  onClear() {
    this.it04Form.reset();
    this.profileImageBase64 = '';
    this.saveMessage = '';
    this.savedId = '';
    this.isLoading = false;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
