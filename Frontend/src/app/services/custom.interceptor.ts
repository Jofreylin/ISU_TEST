import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor(private spinnerService: NgxSpinnerService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.show();

    let params = req.params;

    for (const key of params.keys()) {
      if (params.get(key) == null 
      || params.get(key) == undefined 
      || params.get(key) == 'null' 
      || params.get(key) == 'undefined') {
        params = params.delete(key);
      }
    }

    const request = req.clone({ params });

    return next.handle(request).pipe(
      finalize(() => this.spinnerService.hide())
    );
  }
}
