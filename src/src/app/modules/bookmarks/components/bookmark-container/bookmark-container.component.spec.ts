import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkContainerComponent } from './bookmark-container.component';

describe('BookmarkContainerComponent', () => {
  let component: BookmarkContainerComponent;
  let fixture: ComponentFixture<BookmarkContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
