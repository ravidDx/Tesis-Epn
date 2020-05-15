import { TestBed } from '@angular/core/testing';

import { PromocionService } from './promocion.service';

describe('PromocionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromocionService = TestBed.get(PromocionService);
    expect(service).toBeTruthy();
  });
});
