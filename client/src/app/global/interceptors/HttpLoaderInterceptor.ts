import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) { }

  count = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinner.show();

    this.count++;

    return next.handle(req)
      .pipe(tap(
      ), finalize(() => {
        this.count--;
        if (this.count == 0) {
          this.spinner.hide();
        }
      })
    );
  }
}