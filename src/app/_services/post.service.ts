import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from './model.post';
import { map, finalize } from 'rxjs/operators';

const baseUrl = `https://jsonplaceholder.typicode.com`;

@Injectable({ providedIn: 'root' })
export class PostService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }

    getAll() {
        return this.http.get<Post[]>(`${baseUrl}/posts`);
    }

    create(params: any) {
      return this.http.post(`${baseUrl}/posts`, params);
  }
    delete(id: number) {
      return this.http.delete(`${baseUrl}/posts/${id}`)
          .pipe(finalize(() => {

          }));
  }
}
