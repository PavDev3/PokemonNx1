import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SearchBoxComponent } from './searchBox.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBoxComponent, ReactiveFormsModule, SearchBoxComponent],
      providers: [FormBuilder], // Mock the form builder
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the search result when the form value changes if not empty', () => {
    jest.spyOn(component.searchResult, 'emit'); // spy on the searchResult output
    // simulate the user typing in the searchbox
    component.searchForm.setValue({ search: 'pikachu' });
    expect(component.searchResult.emit).toHaveBeenCalledWith('pikachu');
  });

  it('should not emit the search result when the form value changes if empty', () => {
    jest.spyOn(component.searchResult, 'emit');
    // simulate the user typing in the searchbox
    component.searchForm.setValue({ search: '' });
    expect(component.searchResult.emit).toHaveBeenCalledWith('');
  });
});
