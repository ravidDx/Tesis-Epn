import { TestBed } from '@angular/core/testing';

import { RutinaService } from './rutina.service';

describe('RutinaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RutinaService = TestBed.get(RutinaService);
    expect(service).toBeTruthy();
  });
});
