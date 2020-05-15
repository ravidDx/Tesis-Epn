import { TestBed } from '@angular/core/testing';

import { UserolesService } from './useroles.service';

describe('UserolesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserolesService = TestBed.get(UserolesService);
    expect(service).toBeTruthy();
  });
});
