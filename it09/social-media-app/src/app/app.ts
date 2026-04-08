import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocialPost } from './social-post/social-post';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SocialPost],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('social-media-app');
}
