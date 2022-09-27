import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading:boolean = false;
  Sub!:Subscription;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.Sub = this.authService.getAuthStatusListener().subscribe(isAuth=>{
      this.isLoading = false;
    });
  }

  OnLogin(form: NgForm)
  {
    if(form.invalid)
    {
      return;
    }
    this.authService.OnLogIn(form.value.email,form.value.password);
    this.isLoading = true;
  }
}
