import { TestBed } from '@angular/core/testing';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';

import { TokenInterceptorInterceptor } from './token-interceptor.interceptor';
import {Observable} from "rxjs";
import {Router} from "@angular/router";

class MockRouter {
  navigate(path: string[]) {}
}

describe('TokenInterceptorInterceptor', () => {
  let interceptor: HttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenInterceptorInterceptor,
        { provide: Router, useClass: MockRouter },
      ],
    });

    interceptor = TestBed.inject(TokenInterceptorInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept and modify request', () => {
    const req = new HttpRequest('GET', '/api/data');
    const next: HttpHandler = {
      handle: (request: HttpRequest<any>): Observable<HttpEvent<any>> => {
        // Your custom logic to handle the request
        return new Observable(); // Replace with your actual logic
      },
    };

    const modifiedRequest = interceptor.intercept(req, next);
    // Add your expectations for the modifiedRequest
  });

  // Add more test cases as needed
});
