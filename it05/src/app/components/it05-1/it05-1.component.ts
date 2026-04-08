import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QueueService } from '../../services/queue.service';

@Component({
  selector: 'app-it05-1',
  imports: [CommonModule],
  templateUrl: './it05-1.component.html',
  styleUrl: './it05-1.component.css'
})
export class It051Component {
  isProcessing: boolean = false;

  constructor(
    private router: Router,
    private queueService: QueueService
  ) {}

  async onGetQueue(): Promise<void> {
    if (this.isProcessing || this.queueService.isQueueProcessing()) {
      return;
    }

    this.isProcessing = true;
    
    try {
      await this.queueService.getNextQueue();
      this.router.navigate(['/it05-2']);
    } catch (error) {
      console.error('Error getting queue:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  onClearQueue(): void {
    this.router.navigate(['/it05-3']);
  }

  isQueueProcessing(): boolean {
    return this.queueService.isQueueProcessing();
  }
}
