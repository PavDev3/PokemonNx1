import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { PokemonList } from 'src/app/interfaces/pokemons.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { SearchBoxComponent } from '../../shared/searchBox/searchBox.component';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './pokemon-list.component';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let pokemonServiceMock: jest.Mocked<PokemonService>;

  const mockPokemons: PokemonList[] = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  ];

  beforeEach(() => {
    pokemonServiceMock = {
      fetchPokemons: jest.fn(),
    } as unknown as jest.Mocked<PokemonService>;

    TestBed.configureTestingModule({
      imports: [PokemonListComponent, SearchBoxComponent, PokemonCardComponent],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceMock },
        MessageService,
      ],
    });

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch pokemons on init', () => {
    pokemonServiceMock.fetchPokemons.mockReturnValue(of(mockPokemons));

    component.ngOnInit();

    expect(pokemonServiceMock.fetchPokemons).toHaveBeenCalled();
    expect(component.pokemons()).toEqual(mockPokemons);
    expect(component.filteredPokemons()).toEqual(mockPokemons.slice(0, 20));
  });

  it('should filter pokemons by search term', () => {
    component.pokemons.set(mockPokemons);

    component.onSearchResult('bulb');
    expect(component.filteredPokemons()).toEqual([
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ]);

    component.onSearchResult('');
    expect(component.filteredPokemons()).toEqual(mockPokemons.slice(0, 20));
  });
});
