import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";

@Injectable({ providedIn: "root" })
export class ErrorResponseInterceptor implements HttpInterceptor {
  constructor(private toastr: MatSnackBar) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401) {
          // 401 handled in auth.interceptor          
          this.toastr.open('There is something wrong with the connection', 'Close', {
            duration: 4000,
          });      
        }
        return throwError(error);
      })
    );
  }
}
