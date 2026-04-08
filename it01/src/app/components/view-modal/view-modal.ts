import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-view-modal',
  imports: [CommonModule],
  templateUrl: './view-modal.html',
  styleUrl: './view-modal.css',
})
export class ViewModal {
  @Input() showModal = false;
  @Input() person: Person | undefined;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
