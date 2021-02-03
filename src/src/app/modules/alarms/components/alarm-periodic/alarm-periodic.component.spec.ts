import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmPeriodicComponent } from './alarm-periodic.component';

describe('AlarmPeriodicComponent', () => {
  let component: AlarmPeriodicComponent;
  let fixture: ComponentFixture<AlarmPeriodicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmPeriodicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmPeriodicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
