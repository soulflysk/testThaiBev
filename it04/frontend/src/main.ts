import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

declare global {
  interface Window {
    ngRef?: any;
  }
}

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window.ngRef) {
    window.ngRef.destroy();
  }
  window.ngRef = ref;
});

// Production mode is typically handled by Angular build configuration
// enableProdMode() is called automatically in production builds
