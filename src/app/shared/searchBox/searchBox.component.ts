import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-search-box',
  imports: [CommonModule],
  templateUrl: './searchBox.component.html',
})
export class SearchBoxComponent {
  placeholder = input('Search');
  initialValue = input('');

  onKeyPress(searchTerm: string) {
    /// To do: Implement the search functionality ///

    console.log('Search term:', searchTerm);
  }
}
