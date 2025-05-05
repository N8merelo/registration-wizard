import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-step',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './user-step.component.html',
  styleUrls: ['./user-step.component.scss']
})
export class UserStepComponent implements OnInit {
  @Input() form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Add controls into the passed-in form group
    this.form.addControl('name', this.fb.control('', Validators.required));
    this.form.addControl('firstName', this.fb.control('', Validators.required));
    this.form.addControl('username', this.fb.control('', Validators.required));
    this.form.addControl('email', this.fb.control('', [Validators.required, Validators.email]));
    this.form.addControl('password', this.fb.control('', Validators.required));
    this.form.addControl('passwordRepeat', this.fb.control('', Validators.required));
    this.form.addControl('acceptedTerms', this.fb.control(false, Validators.requiredTrue));
    this.form.addControl('acceptedPrivacyPolicy', this.fb.control(false, Validators.requiredTrue));
  }

  isValid(): boolean {
    return this.form.valid && this.passwordsMatch();
  }

  getValue(): any {
    return this.form.value;
  }

  passwordsMatch(): boolean {
    return this.form.get('password')?.value === this.form.get('passwordRepeat')?.value;
  }
}
