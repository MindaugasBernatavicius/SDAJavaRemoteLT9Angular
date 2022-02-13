import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-posts',
  template: `
      <table class="my-2 table table-striped">
        <thead class="thead-dark">
          <tr class="table-warning">
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Text</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of this.posts">
            <td>{{p.id}}</td>
            <td>{{p.title}}</td>
            <td>{{p.text}}</td>
          </tr>
        <tbody>
      </table>
    `,
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] | undefined;
  constructor(private ps: PostsService) {}
  ngOnInit(): void {
    this.ps.getPosts().subscribe(
      res => {
        console.log(res);
        this.posts = res
      }
    );
  }
}
