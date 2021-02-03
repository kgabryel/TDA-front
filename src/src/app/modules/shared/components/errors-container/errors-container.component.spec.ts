import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsContainerComponent } from './errors-container.component';

describe('ErrorsContainerComponent', () => {
  let component: ErrorsContainerComponent;
  let fixture: ComponentFixture<ErrorsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
