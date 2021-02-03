import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPartComponent } from './content-part.component';

describe('ContentPartComponent', () => {
  let component: ContentPartComponent;
  let fixture: ComponentFixture<ContentPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
