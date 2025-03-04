import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemons.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetailsComponent } from './pokemon-details.component';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let pokemonServiceMock: jest.Mocked<PokemonService>;
  let messageServiceMock: jest.Mocked<MessageService>;

  const mockPokemon: Pokemon = {
    name: 'pikachu',
    id: 25,
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
    sprites: { front_default: 'pikachu.png' },
    types: [{ type: { name: 'electric' } }],
    stats: [
      { base_stat: 35, stat: { name: 'hp' } },
      { base_stat: 55, stat: { name: 'attack' } },
    ],
    height: 4,
    weight: 60,
  } as Pokemon;

  beforeEach(async () => {
    pokemonServiceMock = {
      fetchPokemonDetails: jest.fn(),
    } as unknown as jest.Mocked<PokemonService>;

    messageServiceMock = {
      add: jest.fn(),
    } as unknown as jest.Mocked<MessageService>;

    await TestBed.configureTestingModule({
      imports: [PokemonDetailsComponent],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
        {
          provide: ActivatedRoute,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          useValue: { paramMap: of({ get: (_: string) => '25' }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and set pokemon details on init', () => {
    pokemonServiceMock.fetchPokemonDetails.mockReturnValue(of(mockPokemon));

    fixture.detectChanges();

    expect(pokemonServiceMock.fetchPokemonDetails).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/25/'
    );
    expect(component.pokemonDetails()).toEqual(mockPokemon);
  });

  it('should show error message when API fails', () => {
    pokemonServiceMock.fetchPokemonDetails.mockReturnValue(
      throwError(() => new Error('API Error'))
    );

    fixture.detectChanges();

    expect(messageServiceMock.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to fetch pokemon details',
    });
  });

  it('should not fetch details when id is missing', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [PokemonDetailsComponent],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: () => null }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(pokemonServiceMock.fetchPokemonDetails).not.toHaveBeenCalled();
  });
});
