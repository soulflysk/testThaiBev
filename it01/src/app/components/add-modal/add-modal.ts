import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-add-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-modal.html',
  styleUrl: './add-modal.css',
})
export class AddModal {
  @Input() showModal = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Omit<Person, 'id' | 'age'>>();

  formData: Omit<Person, 'id' | 'age'> = {
    name: '',
    surname: '',
    address: '',
    birthDate: ''
  };

  onClose(): void {
    this.close.emit();
    this.resetForm();
  }

  onSave(): void {
    if (this.isFormValid()) {
      this.save.emit(this.formData);
      this.resetForm();
    }
  }

  onBirthDateChange(): void {
    // Calculate age when birth date changes
  }

  calculateAge(birthDate: string): number {
    if (!birthDate) return 0;
    
    const [day, month, year] = birthDate.split('/').map(Number);
    if (isNaN(day) || isNaN(month) || isNaN(year)) return 0;
    
    const birth = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      surname: '',
      address: '',
      birthDate: ''
    };
  }

  private isFormValid(): boolean {
    return this.formData.name.trim() !== '' &&
           this.formData.surname.trim() !== '' &&
           this.formData.address.trim() !== '' &&
           this.formData.birthDate.trim() !== '';
  }
}
