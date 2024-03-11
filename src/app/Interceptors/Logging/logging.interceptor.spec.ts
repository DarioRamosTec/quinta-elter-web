import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoggingInterceptor } from './logging.interceptor';

describe('AuthInterceptor', () => {
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        LoggingInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoggingInterceptor,
          multi: true
        },
      ],
    });

    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    const interceptor: LoggingInterceptor = TestBed.inject(LoggingInterceptor);
    expect(interceptor).toBeTruthy();
  });

});
