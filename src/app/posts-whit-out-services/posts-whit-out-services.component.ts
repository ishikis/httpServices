import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'posts2',
  templateUrl: './posts-whit-out-services.component.html'
})
export class PostsWhitOutServicesComponent  {

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
    input.value = "";

    this.http.post(this.url, JSON.stringify(post))
      .subscribe(x => {
        post['id'] = x['id'];
        this.posts.splice(0, 0, post);
        console.log(x);
      })
  }

  updatePost(post) {
    post.title = 'updated';

    this.http.put(this.url + '/' + post.id, JSON.stringify(post))
      .subscribe(x => {
        console.log(x);
      });;
    // patch kullanınımı
    // this.http.patch(this.url + '/' + post['id'], JSON.stringify({
    //   title: 'updated'
    // })).subscribe(x => {
    //   console.log(x);
    // });
  }

  deletePost(post) {
    this.http.delete(this.url + '/' + post.id)
      .subscribe(x => {
        console.log(x);

        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      });;
  }


}
