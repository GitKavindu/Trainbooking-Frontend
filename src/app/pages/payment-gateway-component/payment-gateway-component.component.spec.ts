import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatewayComponentComponent } from './payment-gateway-component.component';

describe('PaymentGatewayComponentComponent', () => {
  let component: PaymentGatewayComponentComponent;
  let fixture: ComponentFixture<PaymentGatewayComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentGatewayComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentGatewayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
