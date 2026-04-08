import { Component, signal } from '@angular/core';
import { Person } from './models/person.model';
import { PersonService } from './services/person.service';
import { AddModal } from './components/add-modal/add-modal';
import { ViewModal } from './components/view-modal/view-modal';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [AddModal, ViewModal, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('thai-bev-app');
  people$: Observable<Person[]>;
  people: Person[] = [];
  showAddModal = false;
  showViewModal = false;
  selectedPerson: Person | undefined;

  constructor(private personService: PersonService) {
    this.people$ = this.personService.getPeople();
    this.people$.subscribe(data => {
      this.people = data;
    });
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  openViewModal(id: number): void {
    this.selectedPerson = this.personService.getPersonById(id);
    if (this.selectedPerson) {
      this.showViewModal = true;
    }
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedPerson = undefined;
  }

  onSavePerson(personData: Omit<Person, 'id' | 'age'>): void {
    this.personService.addPerson(personData);
    this.closeAddModal();
  }
}
