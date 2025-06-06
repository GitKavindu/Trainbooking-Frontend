import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStationComponent } from './add-edit-station.component';

describe('AddEditStationComponent', () => {
  let component: AddEditStationComponent;
  let fixture: ComponentFixture<AddEditStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditStationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
