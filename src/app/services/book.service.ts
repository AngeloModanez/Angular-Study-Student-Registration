import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  apiUrl = 'http://localhost:3000/books'

  constructor(private httpClient: HttpClient) { }

  getBook(): Observable<Book[]>{
    return this.httpClient.get<Book[]>(this.apiUrl)
  }
  save(book: Book): Observable<Book>{
    return this.httpClient.post<Book>(this.apiUrl, book)
  }
  update(book: Book): Observable<Book>{
    return this.httpClient.put<Book>(`${this.apiUrl}/${book.id}`, book)
  }
  delete(book: Book): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/${book.id}`)
  }

}