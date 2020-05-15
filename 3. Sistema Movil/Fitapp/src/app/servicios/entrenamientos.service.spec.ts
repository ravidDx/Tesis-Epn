import { TestBed } from '@angular/core/testing';

import { EntrenamientosService } from './entrenamientos.service';

describe('EntrenamientosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntrenamientosService = TestBed.get(EntrenamientosService);
    expect(service).toBeTruthy();
  });
});
