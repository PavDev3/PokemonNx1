import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Toast } from 'primeng/toast';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  imports: [RouterModule, HeaderComponent, Toast],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
