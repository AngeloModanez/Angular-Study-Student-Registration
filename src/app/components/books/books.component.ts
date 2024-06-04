import { Component, OnInit } from '@angular/core';
import { Book } from '../../interfaces/book';
import { BookService } from '../../services/book.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  arrayBook: Book[] = [];
  bookFormGroup: FormGroup;

  isEditing: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService
  ) {
    this.bookFormGroup = formBuilder.group({
      id: [''],
      title: [''],
      author: [''],
      synopsis: [''],
      date: [''],
      genre: ['']
    })
  }

  ngOnInit(): void {
    this.loadBook();
  }

  loadBook() {
    this.bookService.getBook().subscribe({
      next: data => this.arrayBook = data,
    });
  }

  save() {
    this.submitted = true;
    if (this.isEditing) {
      this.bookService.update(this.bookFormGroup.value).subscribe({
        next: () => {
          this.loadBook();
          this.isEditing = false;
          this.submitted = false;
          this.bookFormGroup.reset();
        },
      });
    } else {
      this.bookService.save(this.bookFormGroup.value).subscribe({
        next: data => {
          this.arrayBook.push(data);
          this.bookFormGroup.reset();
          this.submitted = false;
        },
      });
    }
  }

  delete(variable: Book) {
    this.bookService.delete(variable).subscribe({
      next: () => this.loadBook(),
    });
  }

  update(variable: Book) {
    this.isEditing = true;
    this.bookFormGroup.setValue(variable);
  }
}
