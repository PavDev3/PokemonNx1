import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from './pokemon-card.component';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let pokemonServiceMock: jest.Mocked<PokemonService>;

  beforeEach(async () => {
    // Mock de MessageService
    const messageServiceMock = {
      add: jest.fn(),
    };

    // Mock de PokemonService
    pokemonServiceMock = {
      fetchPokemonDetails: jest.fn().mockReturnValue(
        of({
          name: 'Pikachu',
          sprites: { front_default: 'pikachu.png' },
          types: [{ type: { name: 'Electric' } }],
        })
      ),
      fetchPokemons: jest.fn(),
      pokemons: [],
      pokemonMap: new Map(),
    } as unknown as jest.Mocked<PokemonService>;

    // Mock de ActivatedRoute
    const activatedRouteMock = {
      snapshot: { paramMap: { get: jest.fn().mockReturnValue('25') } },
    };

    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent], // Standalone component
      providers: [
        { provide: PokemonService, useValue: pokemonServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;

    // Simulamos el `InputSignal<string>` de `pokemonUrl`
    (component as any).pokemonUrl = signal(
      'https://pokeapi.co/api/v2/pokemon/25'
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch pokemon details on init', () => {
    expect(pokemonServiceMock.fetchPokemonDetails).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/25'
    );
  });
});
