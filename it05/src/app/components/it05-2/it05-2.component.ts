import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QueueService } from '../../services/queue.service';

@Component({
  selector: 'app-it05-2',
  imports: [CommonModule],
  templateUrl: './it05-2.component.html',
  styleUrl: './it05-2.component.css'
})
export class It052Component {
  currentQueue: string = '';
  currentDateTime: string = '';

  constructor(
    private router: Router,
    private queueService: QueueService
  ) {
    this.currentQueue = this.queueService.getCurrentQueue();
    this.currentDateTime = this.formatDateTime(new Date());
  }

  private formatDateTime(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `วันที่ : ${day}/${month}/${year} เวลา ${hours}:${minutes} น.`;
  }

  onBackToQueue(): void {
    this.router.navigate(['/it05-1']);
  }
}
