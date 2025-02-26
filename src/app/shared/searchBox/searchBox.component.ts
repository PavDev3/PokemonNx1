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

  fb = inject(FormBuilder);
  searchForm = this.fb.group({
    search: [''],
  });

  constructor() {
    this.searchForm.valueChanges.subscribe((value) => {
      if (value.search) {
        this.searchResult.emit(value.search);
      }
    });
  }
}
