import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformancesPage } from './performances.page';

describe('PerformancesPage', () => {
  let component: PerformancesPage;
  let fixture: ComponentFixture<PerformancesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformancesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformancesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
