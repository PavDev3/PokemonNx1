import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './searchBox.component.html',
})
export class SearchBoxComponent {
  searchResult = output<string>();
  // inject the form builder
  fb = inject(FormBuilder);
  // create the search form
  searchForm = this.fb.group({
    search: [''],
  });

  constructor() {
    // emit the search result when the form value changes if not empty
    this.searchForm.valueChanges.subscribe((value) => {
      this.searchResult.emit(value.search || '');
    });
  }
}
