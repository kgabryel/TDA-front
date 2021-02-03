import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSheetComponent } from './status-sheet.component';

describe('StatusSheetComponent', () => {
  let component: StatusSheetComponent;
  let fixture: ComponentFixture<StatusSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
