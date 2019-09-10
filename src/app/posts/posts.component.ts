import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent {
  posts: [any];
  private url: string = "https://jsonplaceholder.typicode.com/posts";
  constructor(private http: HttpClient) {

    http.get(this.url).subscribe(x => {
      this.posts = <[any]>x;
      console.log(x)
    })

  }
  createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    input.value ="";

    this.http.post(this.url, JSON.stringify(post))
      .subscribe(x => {
        post['id'] = x['id'];
        this.posts.splice(0, 0, post);
        console.log(x);
      })
  }


}
