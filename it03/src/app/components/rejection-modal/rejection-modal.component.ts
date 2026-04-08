import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rejection-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rejection-modal.component.html',
  styleUrls: ['./rejection-modal.component.css']
})
export class RejectionModalComponent {
  @Input() isVisible = false;
  @Output() reject = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();
  
  reason: string = '';

  onReject(): void {
    if (this.reason.trim()) {
      this.reject.emit(this.reason);
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.reason = '';
  }
}
