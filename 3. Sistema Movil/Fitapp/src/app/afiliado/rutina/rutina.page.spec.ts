import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaPage } from './rutina.page';

describe('RutinaPage', () => {
  let component: RutinaPage;
  let fixture: ComponentFixture<RutinaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutinaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
