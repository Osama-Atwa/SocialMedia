import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private TokenTime: any;
  private token!: string;
  private userID!: string;
  private isAuth: boolean = false;
  private authStatusListener = new Subject<boolean>();
  URL: string = environment.URL + 'user';
  constructor(private http: HttpClient, private router: Router) {}
  OnSignUp(email: string, password: string) {
    const authdata: AuthData = {
      email: email,
      password: password,
    };
    // console.log(authdata);
    return this.http.post(this.URL + '/signup', authdata).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/']);
      },
      (err) => {
        this.authStatusListener.next(false);
      }
    );
  }

  getAuth() {
    return this.isAuth;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getToken() {
    return this.token;
  }

  getUserID() {
    return this.userID;
  }
  OnLogIn(email: string, password: string) {
    const authdata: AuthData = {
      email: email,
      password: password,
    };
    // console.log(authdata);
    this.http
      .post<{ token: string; expiresIn: number; userID: string }>(
        this.URL + '/login',
        authdata
      )
      .subscribe(
        (res) => {
          this.token = res['token'];
          if (this.token) {
            this.authStatusListener.next(true);
            this.isAuth = true;
            this.userID = res.userID;
            this.autTimeOut(res.expiresIn);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + res.expiresIn * 1000
            );
            // console.log(expirationDate);
            this.saveAuthToken(this.token, expirationDate, this.userID);
            this.router.navigate(['/']);
          }
        },
        (err) => {
          this.authStatusListener.next(false);
        }
      );
  }

  onLogOut() {
    this.token = '';
    this.isAuth = false;
    this.userID = '';
    this.authStatusListener.next(false);
    clearTimeout(this.TokenTime);
    this.clearAuthToken();
    this.router.navigate(['/']);
  }

  autoAuthData() {
    const authInfo = this.getAuthInfo();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuth = true;
      this.userID = authInfo.userID;
      this.autTimeOut(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private autTimeOut(expiresIn: number) {
    this.TokenTime = setTimeout(() => {
      this.onLogOut();
    }, expiresIn * 1000);
  }

  private saveAuthToken(token: string, expirationDate: Date, userID: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userID', userID);
    localStorage.setItem('expirationdate', expirationDate.toISOString());
  }

  private clearAuthToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('expirationdate');
  }

  private getAuthInfo() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationdate');
    const userID = localStorage.getItem('userID');

    if (!token || !expirationDate || !userID) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userID: userID,
    };
  }
}
