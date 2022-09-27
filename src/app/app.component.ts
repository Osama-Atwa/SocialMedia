import { AuthService } from './auth/auth.service';
import { post } from './Posts/post.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Post';
  posts: post[] = [];

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.autoAuthData();
  }
}
