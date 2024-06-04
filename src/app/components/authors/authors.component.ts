import { Component } from '@angular/core';
import { Author } from '../../interfaces/author';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {
  arrayAuthor: Author[] = [];
  authorFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.authorFormGroup = formBuilder.group({
      id: [''],
      name: [''],
      pseudonym: [''],
      born: [''],
      nationality: [''],
      prize: [false]
    })
  }

  save() {
    this.arrayAuthor.push(this.authorFormGroup.value);
  }
}
