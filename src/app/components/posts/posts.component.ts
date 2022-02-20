import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-posts',
  template: `
      <table class="my-2 table table-striped" *ngIf="!errorPresent">
        <thead class="thead-dark">
          <tr class="table-warning">
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Text</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of this.posts">
            <td>{{p.id}}</td>
            <td>{{p.title}}</td>
            <td>{{p.text}}</td>
            <td><button class="btn btn-danger" (click)="deletePost(p.id)">Delete</button></td>
          </tr>
        <tbody>
      </table>
      <div *ngIf="errorPresent">
        <p>An error connecting to the backend occurred!</p>
        <p>Please contac support</p>
      </div>
      <form #f="ngForm" (ngSubmit)="createPost(f)">
        <div class="form-group">
          <label for="title">Title</label>
          <input name="title" type="text" class="form-control" id="title" required
                 ngModel #tf="ngModel"
                 [class.field-error]="f.submitted && tf.invalid">
          <div [hidden]="!f.submitted || tf.valid" class="alert alert-danger">
            Please don't leave the value empty
          </div>
          <label for="text">Text</label>
          <input name="text" type="text" class="form-control" id="text" required
                 ngModel #txtf="ngModel"
                 [class.field-error]="f.submitted && txtf.invalid">
        </div>
        <div [hidden]="!postError" class="alert alert-danger">"Unable to create new post"</div>
        <br>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>

  `,
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] | undefined;
  errorPresent: Boolean = false;
  postError: Boolean = false;
  constructor(private ps: PostsService) {}
  ngOnInit(): void {
    // Pre-Angular v13 service subscribe
    // this.ps.getPosts().subscribe(
    //   res => {
    //     console.log(res);
    //     this.posts = res
    //   },
    //   err => {
    //     this.errorPresent = true
    //   }
    // );

    // Modern, Angular v13 service subscribe()
    // ... https://stackoverflow.com/a/55472361/1964707
    const postObserver = {
      next: (res: any) => {
        console.log(res);
        this.posts = res
      },
      error: (err: any) => console.log(err)
    }

    this.ps.getPosts().subscribe(postObserver);
  }

  createPost(f: NgForm): void {
    console.log(f.value) // TODO :: convert to BlogPost object, not f.value
    const postObserver = {
      next: (res: any) => {
        console.log(res);
        this.posts = res
      },
      error: (err: any) => console.log(err)
    }
    this.ps.createPost(f.value).subscribe({
      next: res => this.ps.getPosts().subscribe(postObserver),
      error: err => {
        console.log(err);
        this.postError = true;
      }
    })
  }

  deletePost(id: number): void {
    this.ps.deletePost(id).subscribe({
      next: res => this.posts = this.posts?.filter(p => p.id !== id),
      error: err => console.log(err),
    })
  }
}
