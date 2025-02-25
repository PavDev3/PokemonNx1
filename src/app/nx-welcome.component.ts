import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule],
  template: ` <h1 class="text-3xl font-bold underline">Hello world!</h1> `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
