import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemcatwiseComponent } from './itemcatwise.component';

describe('ItemcatwiseComponent', () => {
  let component: ItemcatwiseComponent;
  let fixture: ComponentFixture<ItemcatwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemcatwiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemcatwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
