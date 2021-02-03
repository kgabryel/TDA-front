import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallFormComponent } from './small-form.component';

describe('SmallFormComponent', () => {
  let component: SmallFormComponent;
  let fixture: ComponentFixture<SmallFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
