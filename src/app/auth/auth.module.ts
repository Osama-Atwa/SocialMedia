import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './../angular-material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    RouterModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
