import { TestBed } from '@angular/core/testing';

import { DeportistasService } from './deportistas.service';

describe('DeportistasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeportistasService = TestBed.get(DeportistasService);
    expect(service).toBeTruthy();
  });
});
