import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private currentQueue: string = 'A0';
  private isProcessing: boolean = false;

  constructor() { }

  getCurrentQueue(): string {
    return this.currentQueue;
  }

  setCurrentQueue(queue: string): void {
    this.currentQueue = queue;
  }

  async getNextQueue(): Promise<string> {
    if (this.isProcessing) {
      throw new Error('Queue generation in progress');
    }

    this.isProcessing = true;
    
    try {
      const letter = this.currentQueue.charAt(0);
      const number = parseInt(this.currentQueue.charAt(1));
      
      let nextLetter = letter;
      let nextNumber = number + 1;
      
      if (nextNumber > 9) {
        nextNumber = 0;
        nextLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
        
        if (nextLetter > 'Z') {
          nextLetter = 'A';
        }
      }
      
      this.currentQueue = nextLetter + nextNumber.toString();
      
      // Simulate processing delay to prevent rapid clicking
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return this.currentQueue;
    } finally {
      this.isProcessing = false;
    }
  }

  clearQueue(): void {
    this.currentQueue = 'A0';
  }

  isQueueProcessing(): boolean {
    return this.isProcessing;
  }
}
