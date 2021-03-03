import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLoadingComponent } from './main-loading.component';

describe('MainLoadingComponent', () => {
  let component: MainLoadingComponent;
  let fixture: ComponentFixture<MainLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
