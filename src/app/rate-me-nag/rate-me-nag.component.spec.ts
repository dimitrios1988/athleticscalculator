import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateMeNagComponent } from './rate-me-nag.component';

describe('RateMeNagComponent', () => {
  let component: RateMeNagComponent;
  let fixture: ComponentFixture<RateMeNagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateMeNagComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateMeNagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
