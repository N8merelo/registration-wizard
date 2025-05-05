import { Component } from '@angular/core';
import { WizardComponent } from './wizard/wizard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WizardComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'registration-wizard';
}
