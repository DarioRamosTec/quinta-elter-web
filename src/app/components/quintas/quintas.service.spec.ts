import { TestBed } from '@angular/core/testing';

import { QuintasService } from './quintas.service';

describe('QuintasService', () => {
  let service: QuintasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuintasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
