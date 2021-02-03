import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmSwitchComponent } from './alarm-switch.component';

describe('AlarmSwitchComponent', () => {
  let component: AlarmSwitchComponent;
  let fixture: ComponentFixture<AlarmSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
