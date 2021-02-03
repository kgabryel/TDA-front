import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmSingleComponent } from './alarm-single.component';

describe('AlarmSingleComponent', () => {
  let component: AlarmSingleComponent;
  let fixture: ComponentFixture<AlarmSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
