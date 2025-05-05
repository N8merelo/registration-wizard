// company-step.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-company-step',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './company-step.component.html',
  styleUrls: ['./company-step.component.scss']
})
export class CompanyStepComponent implements OnInit {
  @Input() form!: FormGroup;
  industries: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form.addControl('companyName', this.fb.control('', Validators.required));
    this.form.addControl('industryId', this.fb.control('', Validators.required));

    this.http.get<any[]>('http://localhost:5193/api/industry')
      .subscribe({
        next: data => this.industries = data,
        error: err => console.error('Failed to load industries', err)
      });
  }
}
