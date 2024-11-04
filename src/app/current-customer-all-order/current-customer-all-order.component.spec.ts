import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCustomerAllOrderComponent } from './current-customer-all-order.component';

describe('CurrentCustomerAllOrderComponent', () => {
  let component: CurrentCustomerAllOrderComponent;
  let fixture: ComponentFixture<CurrentCustomerAllOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentCustomerAllOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentCustomerAllOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
