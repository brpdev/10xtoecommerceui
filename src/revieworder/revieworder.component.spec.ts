import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevieworderComponent } from './revieworder.component';

describe('RevieworderComponent', () => {
  let component: RevieworderComponent;
  let fixture: ComponentFixture<RevieworderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevieworderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevieworderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
