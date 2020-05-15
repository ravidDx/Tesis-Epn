import { TestBed } from '@angular/core/testing';

import { EntrenamientoService } from './entrenamiento.service';

describe('EntrenamientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntrenamientoService = TestBed.get(EntrenamientoService);
    expect(service).toBeTruthy();
  });
});
