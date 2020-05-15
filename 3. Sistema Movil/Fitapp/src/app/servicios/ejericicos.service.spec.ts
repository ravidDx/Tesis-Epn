import { TestBed } from '@angular/core/testing';

import { EjericicosService } from './ejericicos.service';

describe('EjericicosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EjericicosService = TestBed.get(EjericicosService);
    expect(service).toBeTruthy();
  });
});
