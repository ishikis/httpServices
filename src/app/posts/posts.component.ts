import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {

  posts: [any];
  error;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(
      x => {
        this.posts = <[any]>x
        console.log(x)
      },
      error => {
        this.error = error;
        // console.log(error);
      }
    );
  }

  createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    input.value = "";

    this.postService.createPost(post)
      .subscribe(x => {
        post['id'] = x['id'];
        this.posts.splice(0, 0, post);
        console.log(x);
      })
  }


  updatePost(post) {
    post.title = 'updated';

    this.postService.updatePost(post)
      .subscribe(x => {
        console.log(x);
      });;

    // this.http.patch(this.url + '/' + post['id'], JSON.stringify({
    //   title: 'updated'
    // })).subscribe(x => {
    //   console.log(x);
    // });
  }


  deletePost(post) {
    this.postService.deletePost(post)
      .subscribe(x => {
        console.log(x);

        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
        error => {
          this.error = error;
          // console.log(error);
        }
      );;
  }

}
