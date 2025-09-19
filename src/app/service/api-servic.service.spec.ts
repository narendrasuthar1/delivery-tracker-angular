import { TestBed } from '@angular/core/testing';

import { ApiServicService } from './api-servic.service';

describe('ApiServicService', () => {
  let service: ApiServicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
