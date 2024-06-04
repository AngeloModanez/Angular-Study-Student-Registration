import { Component, OnInit } from '@angular/core';
import { Author } from '../../interfaces/author';
import { AuthorService } from '../../services/author.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent implements OnInit {
  arrayAuthor: Author[] = [];
  authorFormGroup: FormGroup;

  isEditing: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorService
  ) {
    this.authorFormGroup = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      pseudonym: [''],
      born: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      prize: [false]
    })
  }

  ngOnInit(): void {
    this.loadAuthor();
  }

  loadAuthor() {
    this.authorService.getAuthor().subscribe({
      next: data => this.arrayAuthor = data,
    });
  }

  save() {
    this.submitted = true;

    if (this.authorFormGroup.valid) {
      if (this.isEditing) {
        this.authorService.update(this.authorFormGroup.value).subscribe({
          next: () => {
            this.loadAuthor();
            this.isEditing = false;
            this.submitted = false;
            this.authorFormGroup.reset();
          },
        });
      } else {
        this.authorService.save(this.authorFormGroup.value).subscribe({
          next: data => {
            this.arrayAuthor.push(data);
            this.authorFormGroup.reset();
            this.submitted = false;
          },
        });
      }
    }
  }

  delete(variable: Author) {
    this.authorService.delete(variable).subscribe({
      next: () => this.loadAuthor(),
    });
  }

  update(variable: Author) {
    this.isEditing = true;
    this.authorFormGroup.setValue(variable);
  }

  get name(): any {
    return this.authorFormGroup.get('name')
  }

  get born(): any {
    return this.authorFormGroup.get('born')
  }

  get nationality(): any {
    return this.authorFormGroup.get('nationality')
  }
}
