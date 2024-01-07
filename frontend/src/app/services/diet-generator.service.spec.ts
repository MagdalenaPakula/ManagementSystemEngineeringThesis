import { TestBed } from '@angular/core/testing';

import { DietGeneratorService } from './diet-generator.service';

describe('DietGeneratorService', () => {
  let service: DietGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DietGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
