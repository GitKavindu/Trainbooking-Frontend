import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainCompartmentComponent } from './train-compartment.component';

describe('TrainCompartmentComponent', () => {
  let component: TrainCompartmentComponent;
  let fixture: ComponentFixture<TrainCompartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainCompartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainCompartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
