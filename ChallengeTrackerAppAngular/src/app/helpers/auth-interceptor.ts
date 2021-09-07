import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SessionService } from '../services/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private sessionService: SessionService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.sessionService.getCurrentUser();
        const authdata: string = `${currentUser.username}:${currentUser.password}`
        if (currentUser != null) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${authdata}`
                }
            });
        }
        return next.handle(request);
    }
}