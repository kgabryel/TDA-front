import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePartComponent } from './type-part.component';

describe('TypePartComponent', () => {
  let component: TypePartComponent;
  let fixture: ComponentFixture<TypePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypePartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
