import { Component, OnInit } from '@angular/core';
import { Author } from '../../interfaces/author';
import { AuthorService } from '../../services/author.service';
import { Book } from '../../interfaces/book';
import { BookService } from '../../services/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  arrayBook: Book[] = [];
  arrayAuthor: Author[] = [];
  bookFormGroup: FormGroup;

  isEditing: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private bookService: BookService
  ) {
    this.bookFormGroup = formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      authorId: ['', [Validators.required]],
      synopsis: ['', [Validators.required]],
      date: ['', [Validators.required]],
      genre: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.loadBook();
    this.loadAuthor();
  }

  loadBook() {
    this.bookService.getBook().subscribe({
      next: data => this.arrayBook = data,
    });
  }

  loadAuthor() {
    this.authorService.getAuthor().subscribe({
      next: data => this.arrayAuthor = data,
    });
  }

  save() {
    this.submitted = true;

    if (this.bookFormGroup.valid) {
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

  getAuthorName(authorId: number): Author | undefined {
    return this.arrayAuthor.find(a => a.id === authorId);
  }

  compareAuthors(author1: Author, author2: Author): boolean {
    return author1 && author2 ? author1.id === author2.id : author1 === author2;
  }

  get title(): any {
    return this.bookFormGroup.get('title')
  }

  get authorId(): any {
    return this.bookFormGroup.get('authorId')
  }

  get synopsis(): any {
    return this.bookFormGroup.get('synopsis')
  }

  get date(): any {
    return this.bookFormGroup.get('date')
  }

  get genre(): any {
    return this.bookFormGroup.get('genre')
  }
}

