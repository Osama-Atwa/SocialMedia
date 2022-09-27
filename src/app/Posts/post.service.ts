import { environment } from './../../environments/environment';

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { post } from './post.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  Posts: post[] = [];
  URL: string = environment.URL + 'posts';
  private postupdated = new Subject<{ posts: post[]; totalPosts: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPostUpdatedListener() {
    return this.postupdated.asObservable();
  }

  getPosts(pageSize: number, currentPage: number) {
    const query = `?pageSize=${pageSize}&page=${currentPage}`;
    this.http
      .get<{ message: string; body: any; totalPosts: number }>(this.URL + query)
      .pipe(
        map((postsData) => {
          // console.log(postsData);
          return {
            posts: postsData.body.map(
              (post: {
                title: any;
                content: any;
                _id: any;
                imagePath: any;
                creator: string;
              }) => {
                return {
                  title: post.title,
                  content: post.content,
                  id: post._id,
                  imagePath: post.imagePath,
                  creator: post.creator,
                };
              }
            ),
            totalPosts: postsData.totalPosts,
          };
        })
      )
      .subscribe((TransformedData) => {
        this.Posts = TransformedData.posts;
        // console.log("TrasnformedData.posts : "+TransformedData.posts);
        this.postupdated.next({
          posts: [...this.Posts],
          totalPosts: TransformedData.totalPosts,
        });
      });
  }

  SetPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http
      .post<{ message: string; post: post }>(this.URL, postData)
      .subscribe((res) => {
        this.router.navigate(['/']);
      });
    // this.postupdated.next(this.Posts);
  }

  DeletePost(postid: string) {
    return this.http.delete(`${this.URL}/${postid}`);
  }
  UpdatePost(id: string, title: string, content: string, image: string | File) {
    let postData: post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: '',
      };
    }
    this.http
      .put<{ message: string }>(`${this.URL}/${id}`, postData)
      .subscribe((res) => {
        this.router.navigate(['/']);
      });
  }
  GetPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>(`${this.URL}/${id}`);
  }
}
