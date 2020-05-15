import { TestBed } from '@angular/core/testing';

import { DietasService } from './dietas.service';

describe('DietasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DietasService = TestBed.get(DietasService);
    expect(service).toBeTruthy();
  });
});
