import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCatgoryComponent } from './sub-catgory.component';

describe('SubCatgoryComponent', () => {
  let component: SubCatgoryComponent;
  let fixture: ComponentFixture<SubCatgoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCatgoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCatgoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
