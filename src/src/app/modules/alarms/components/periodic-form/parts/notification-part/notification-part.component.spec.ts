import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPartComponent } from './notification-part.component';

describe('NotificationPartComponent', () => {
  let component: NotificationPartComponent;
  let fixture: ComponentFixture<NotificationPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
