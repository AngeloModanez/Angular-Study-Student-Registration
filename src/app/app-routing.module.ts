import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'authors', component: AuthorsComponent},
  {path: 'books', component: BooksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
