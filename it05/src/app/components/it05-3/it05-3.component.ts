import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QueueService } from '../../services/queue.service';

@Component({
  selector: 'app-it05-3',
  imports: [CommonModule],
  templateUrl: './it05-3.component.html',
  styleUrl: './it05-3.component.css'
})
export class It053Component {
  currentQueue: string = '';

  constructor(
    private router: Router,
    private queueService: QueueService
  ) {
    this.currentQueue = this.queueService.getCurrentQueue();
  }

  onClearQueue(): void {
    this.queueService.clearQueue();
    this.currentQueue = this.queueService.getCurrentQueue();
  }

  onBackToQueue(): void {
    this.router.navigate(['/it05-1']);
  }
}
