import { TestBed } from '@angular/core/testing';

import { OnepageService } from './onepage.service';

describe('OnepageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnepageService = TestBed.get(OnepageService);
    expect(service).toBeTruthy();
  });
});
