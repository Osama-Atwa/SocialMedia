import { AuthInterceptor } from './auth/auth-interseptor';
import { AppRoutingModule } from './app-routing.module';
import { PostService } from './Posts/post.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/Error.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularMaterialModule } from './angular-material.module';
import { PostModule } from './Posts/post.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PostModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    AngularMaterialModule,
  ],
  providers: [
    PostService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule {}
