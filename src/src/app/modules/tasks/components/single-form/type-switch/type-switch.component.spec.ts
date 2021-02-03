import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSwitchComponent } from './type-switch.component';

describe('TypeSwitchComponent', () => {
  let component: TypeSwitchComponent;
  let fixture: ComponentFixture<TypeSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
