import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { It04Component } from './it04/it04.component';
import { It04Service } from './services/it04.service';

@NgModule({
  declarations: [
    AppComponent,
    It04Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [It04Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
