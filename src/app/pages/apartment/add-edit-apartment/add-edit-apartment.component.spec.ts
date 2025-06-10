import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditApartmentComponent } from './add-edit-apartment.component';

describe('AddEditApartmentComponent', () => {
  let component: AddEditApartmentComponent;
  let fixture: ComponentFixture<AddEditApartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditApartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
