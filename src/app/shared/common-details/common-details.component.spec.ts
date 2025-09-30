import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDetailsComponent } from './common-details.component';

describe('CommonDetailsComponent', () => {
  let component: CommonDetailsComponent;
  let fixture: ComponentFixture<CommonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
