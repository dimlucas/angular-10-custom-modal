import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from "rxjs/operators";

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = req.headers
            .set('Authorization', 'TEST');
        const authReq = req.clone({ headers });
        return next.handle(authReq).pipe(
            filter(event => {
                console.log(event);
                return (event instanceof HttpResponse)
            }),
            map( (event: HttpResponse<any>) => {
                let existingHeaders = event.headers;
                let clonedHeaders = existingHeaders.append("x-test-header", "foo");
                return event.clone({
                    headers: clonedHeaders,
                    body: {
                        test: "overwritten"
                    }
                });
            })
        )
    }
}


/**
 * [ Event1, Event2, Event3, Event4 ] ->  [ Event2, Event3 ]
 */