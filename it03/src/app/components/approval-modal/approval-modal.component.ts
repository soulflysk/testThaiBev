import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-approval-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './approval-modal.component.html',
  styleUrls: ['./approval-modal.component.css']
})
export class ApprovalModalComponent {
  @Input() isVisible = false;
  @Output() approve = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();
  
  reason: string = '';

  onApprove(): void {
    if (this.reason.trim()) {
      this.approve.emit(this.reason);
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.reason = '';
  }
}
