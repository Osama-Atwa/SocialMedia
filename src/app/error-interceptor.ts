import { ErrorComponent } from './error/Error.component';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let ErrorMessage = 'An unknown Error Occurs';
        debugger;
        if (error.error.message) {
          ErrorMessage = error.error.message;
        }
        this.dialog.open(ErrorComponent, { data: { message: ErrorMessage } });
        return throwError(error);
      })
    );
  }
}
