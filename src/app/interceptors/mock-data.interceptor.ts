import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockDataInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/api/notes')) {
      const mockNotes = [
        {
          id: 1,
          user: 'Current User',
          timestamp: new Date(),
          type: 'Beer',
          content: 'Ha-ha!'
        },
        {
          id: 2,
          user: 'Current User',
          timestamp: new Date(),
          type: 'Phone',
          content: 'This is a mock phone note.'
        }
      ];

      return of(new HttpResponse({ status: 200, body: mockNotes }));
    }

    return next.handle(req);
  }
}
