import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Comment {
  id: number;
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-social-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './social-post.html',
  styleUrl: './social-post.scss',
})
export class SocialPost {
  newComment: string = '';
  newComments: Comment[] = [];
  private commentIdCounter = 1;

  addComment(): void {
    if (this.newComment.trim()) {
      const comment: Comment = {
        id: this.commentIdCounter++,
        text: this.newComment.trim(),
        timestamp: new Date()
      };
      this.newComments.push(comment);
      this.newComment = '';
    }
  }

  trackByComment(index: number, comment: Comment): number {
    return comment.id;
  }
}
