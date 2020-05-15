import { TestBed } from '@angular/core/testing';

import { PlanEntrenamientoService } from './plan-entrenamiento.service';

describe('PlanEntrenamientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanEntrenamientoService = TestBed.get(PlanEntrenamientoService);
    expect(service).toBeTruthy();
  });
});
