import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTrainComponent } from './add-edit-train.component';

describe('AddEditTrainComponent', () => {
  let component: AddEditTrainComponent;
  let fixture: ComponentFixture<AddEditTrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditTrainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
