import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPeriodicComponent } from './task-periodic.component';

describe('TaskPeriodicComponent', () => {
  let component: TaskPeriodicComponent;
  let fixture: ComponentFixture<TaskPeriodicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskPeriodicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPeriodicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
