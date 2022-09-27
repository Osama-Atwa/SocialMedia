import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuth:boolean = false;
  private Sub!: Subscription;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.userIsAuth = this.authService.getAuth();
    this.Sub = this.authService.getAuthStatusListener()
    .subscribe( isAuthanicated=>{
        this.userIsAuth = isAuthanicated;
      }
    )
  }

  onLogout(){
    this.authService.onLogOut();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.Sub.unsubscribe();
  }
}
