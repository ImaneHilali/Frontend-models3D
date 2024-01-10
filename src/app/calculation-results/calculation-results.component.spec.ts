import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationResultsComponent } from './calculation-results.component';

describe('CalculationResultsComponent', () => {
  let component: CalculationResultsComponent;
  let fixture: ComponentFixture<CalculationResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculationResultsComponent]
    });
    fixture = TestBed.createComponent(CalculationResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
