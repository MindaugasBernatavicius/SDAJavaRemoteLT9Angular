import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, timestamp} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  url = 'http://localhost/api/v1/blogposts'
  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  createPost(post: any): Observable<any> {
    return this.httpClient.post(this.url, post)
  }

  deletePost(id: number): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
