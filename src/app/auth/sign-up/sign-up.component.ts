import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  Sub!:Subscription;
  isLoading:boolean = false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.Sub = this.authService.getAuthStatusListener().subscribe(isAuth=>{
      this.isLoading = false;
    });
  }

  OnSignUp(form: NgForm)
  {
    if(form.invalid)
    {
      return
    }
    this.authService.OnSignUp(form.value.email,form.value.password);
    this.isLoading = true;
  }

}
