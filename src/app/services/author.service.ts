import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../interfaces/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  apiUrl = 'http://localhost:3000/authors'

  constructor(private httpClient: HttpClient) { }

  getAuthor(): Observable<Author[]>{
    return this.httpClient.get<Author[]>(this.apiUrl)
  }
  save(author: Author): Observable<Author>{
    return this.httpClient.post<Author>(this.apiUrl, author)
  }
  update(author: Author): Observable<Author>{
    return this.httpClient.put<Author>(`${this.apiUrl}/${author.id}`, author)
  }
  delete(author: Author): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/${author.id}`)
  }

}