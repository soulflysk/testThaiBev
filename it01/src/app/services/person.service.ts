import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private people: Person[] = [
    { id: 1, name: 'John', surname: 'Doe', address: '123 Main St', birthDate: '01/01/1990', age: 34 },
    { id: 2, name: 'Jane', surname: 'Smith', address: '456 Oak Ave', birthDate: '15/05/1985', age: 39 },
    { id: 3, name: 'Bob', surname: 'Johnson', address: '789 Pine Rd', birthDate: '20/10/1995', age: 29 },
    { id: 4, name: 'Alice', surname: 'Brown', address: '321 Elm St', birthDate: '08/03/1988', age: 36 },
    { id: 5, name: 'Charlie', surname: 'Wilson', address: '654 Maple Dr', birthDate: '12/07/1992', age: 32 },
    { id: 6, name: 'Diana', surname: 'Moore', address: '987 Cedar Ln', birthDate: '25/12/1980', age: 44 },
    { id: 7, name: 'Edward', surname: 'Taylor', address: '147 Birch Blvd', birthDate: '30/04/1978', age: 46 },
    { id: 8, name: 'Fiona', surname: 'Anderson', address: '258 Spruce Way', birthDate: '18/09/1993', age: 31 },
    { id: 9, name: 'George', surname: 'Thomas', address: '369 Willow Cir', birthDate: '05/11/1987', age: 37 }
  ];

  private peopleSubject = new BehaviorSubject<Person[]>(this.people);
  private nextId = 10;

  constructor() { }

  getPeople(): Observable<Person[]> {
    return this.peopleSubject.asObservable();
  }

  addPerson(person: Omit<Person, 'id' | 'age'>): void {
    const age = this.calculateAge(person.birthDate);
    const newPerson: Person = {
      ...person,
      id: this.nextId++,
      age: age
    };
    this.people.push(newPerson);
    this.peopleSubject.next([...this.people]);
  }

  calculateAge(birthDate: string): number {
    const [day, month, year] = birthDate.split('/').map(Number);
    const birth = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  getPersonById(id: number): Person | undefined {
    return this.people.find(person => person.id === id);
  }
}
