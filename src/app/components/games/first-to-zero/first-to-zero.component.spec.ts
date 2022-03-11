import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstToZeroComponent } from './first-to-zero.component';

describe('FirstToZeroComponent', () => {
  let component: FirstToZeroComponent;
  let fixture: ComponentFixture<FirstToZeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstToZeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstToZeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
