import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPartComponent } from './task-part.component';

describe('TaskPartComponent', () => {
  let component: TaskPartComponent;
  let fixture: ComponentFixture<TaskPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
