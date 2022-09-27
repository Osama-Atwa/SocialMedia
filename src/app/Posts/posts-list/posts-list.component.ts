import { AuthService } from './../../auth/auth.service';
import { PostService } from './../post.service';
import { post } from './../post.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {
  posts:post[]=[];
  isLoading:boolean=true;
  totalPosts:number = 0;
  postsPerPage:number = 3;
  pagesSizeOptions:number[] = [1, 2, 3, 5];
  currentPage:number = 1;
  userIsAuth:boolean = false;
  userID!:string;
  private postSub !: Subscription;
  private authSub !: Subscription;

  constructor(private postService:PostService,private authService:AuthService) { }

  ngOnInit(): void {
    this.postService.getPosts(this.postsPerPage,this.currentPage);
    this.postSub = this.postService.getPostUpdatedListener().subscribe({
      next:(postsData:{posts:post[],totalPosts:number})=>{
        this.posts = postsData.posts;
        this.totalPosts = postsData.totalPosts;
        // console.log(postsData.totalPosts);
        this.isLoading = false;
      }
    });
    this.authSub = this.authService.getAuthStatusListener().subscribe(
      isAuth => {
        this.userIsAuth = isAuth;
      }
    );
    this.userIsAuth = this.authService.getAuth();
    this.userID = this.authService.getUserID();
    // console.log("i am in the post list "+this.userID);

  }
  OnDelete(postid:string){
    // debugger;
    this.isLoading = true;
    this.postService.DeletePost(postid).subscribe(()=>{
      this.postService.getPosts(this.postsPerPage,this.currentPage);
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
    this.authSub.unsubscribe();
  }


  OnChangedPage(pageEvent: PageEvent)
  {
    this.currentPage = pageEvent.pageIndex + 1;
    this.postsPerPage = pageEvent.pageSize;
    this.postService.getPosts(this.postsPerPage,this.currentPage);
  }
}
