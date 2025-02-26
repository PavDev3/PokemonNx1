import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchBoxComponent } from '../searchBox/searchBox.component';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, SearchBoxComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
