import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CompanyStepComponent } from '../wizard/company-step/company-step.component';
import { UserStepComponent } from '../wizard/user-step/user-step.component';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatStepperModule,
    MatButtonModule,
    CompanyStepComponent,
    UserStepComponent
  ],
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  wizardForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.wizardForm = this.fb.group({
      companyStep: this.fb.group({
        companyName: ['', Validators.required],
        industryId: ['', Validators.required],
      }),
      userStep: this.fb.group({
        name: ['', Validators.required],
        firstName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        passwordRepeat: ['', Validators.required],
        acceptedTerms: [false, Validators.requiredTrue],
        acceptedPrivacyPolicy: [false, Validators.requiredTrue],
      }),
    });
  }

  get companyStepForm(): FormGroup {
    return this.wizardForm.get('companyStep') as FormGroup;
  }

  get userStepForm(): FormGroup {
    return this.wizardForm.get('userStep') as FormGroup;
  }

  onSubmit() {
    if (this.wizardForm.valid) {
      const payload = {
        companyName: this.companyStepForm.value.companyName,
        industryId: this.companyStepForm.value.industryId,
        name: this.userStepForm.value.name,
        firstName: this.userStepForm.value.firstName,
        username: this.userStepForm.value.username,
        password: this.userStepForm.value.password,
        passwordRepeat: this.userStepForm.value.passwordRepeat,
        email: this.userStepForm.value.email,
        acceptedTerms: this.userStepForm.value.acceptedTerms,
        acceptedPrivacyPolicy: this.userStepForm.value.acceptedPrivacyPolicy,
      };
  
      this.http.post('http://localhost:5193/api/Registration', payload).subscribe({
  next: (response: any) => {
    alert(response.message);
  },
  error: (error) => {
    console.error('Registration error:', error);
    alert('Failed: ' + (error.error?.message || JSON.stringify(error.error)));
  }
});

    } else {
      alert('❌ Form is invalid. Please check all fields.');
    }
  }
  
}
