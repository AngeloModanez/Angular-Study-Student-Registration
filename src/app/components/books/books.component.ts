import { Component } from '@angular/core';
import { Book } from '../../interfaces/book';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  arrayBook: Book[] = [];
  bookFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.bookFormGroup = formBuilder.group({
      id: [''],
      title: [''],
      author: [''],
      synopsis: [''],
      date: [''],
      genre: ['']
    })
  }

  save() {
    this.arrayBook.push(this.bookFormGroup.value);
  }
}
