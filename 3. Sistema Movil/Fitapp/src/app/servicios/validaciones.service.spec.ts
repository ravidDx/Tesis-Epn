import { TestBed } from '@angular/core/testing';

import { ValidacionesService } from './validaciones.service';

describe('ValidacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidacionesService = TestBed.get(ValidacionesService);
    expect(service).toBeTruthy();
  });
});
