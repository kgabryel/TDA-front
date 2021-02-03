import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkDeleteComponent } from './bookmark-delete.component';

describe('BookmarkDeleteComponent', () => {
  let component: BookmarkDeleteComponent;
  let fixture: ComponentFixture<BookmarkDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
