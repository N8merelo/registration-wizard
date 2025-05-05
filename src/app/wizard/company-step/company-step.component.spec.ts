import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStepComponent } from './company-step.component';

describe('CompanyStepComponent', () => {
  let component: CompanyStepComponent;
  let fixture: ComponentFixture<CompanyStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
