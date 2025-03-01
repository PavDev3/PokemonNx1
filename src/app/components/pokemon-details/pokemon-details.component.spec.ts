import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemons.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetailsComponent } from './pokemon-details.component';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let pokemonServiceMock: jest.Mocked<PokemonService>;

  beforeEach(() => {
    pokemonServiceMock = {
      fetchPokemonDetails: jest.fn(),
    } as unknown as jest.Mocked<PokemonService>;

    TestBed.configureTestingModule({
      imports: [PokemonDetailsComponent],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: (key: string) => '25' }) }, // ID Valid
        },
      ],
    });

    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch pokemon details on init', () => {
    const mockPokemon: Pokemon = {
      name: 'Pikachu',
      id: 25,
      sprites: { front_default: 'pikachu.png' },
    } as Pokemon;

    pokemonServiceMock.fetchPokemonDetails.mockReturnValue(of(mockPokemon));

    component.ngOnInit();

    expect(pokemonServiceMock.fetchPokemonDetails).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/25/'
    );

    expect(component.pokemonDetails()).toEqual(mockPokemon);
  });
});

// 🔹 New `describe` for when the ID is missing
describe('PokemonDetailsComponent (without ID)', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let pokemonServiceMock: jest.Mocked<PokemonService>;

  beforeEach(() => {
    pokemonServiceMock = {
      fetchPokemonDetails: jest.fn(),
    } as unknown as jest.Mocked<PokemonService>;

    TestBed.configureTestingModule({
      imports: [PokemonDetailsComponent],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: (key: string) => null }) }, // ID Missing
        },
      ],
    });

    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not fetch details if id is missing', () => {
    component.ngOnInit();
    expect(pokemonServiceMock.fetchPokemonDetails).not.toHaveBeenCalled();
  });
});
