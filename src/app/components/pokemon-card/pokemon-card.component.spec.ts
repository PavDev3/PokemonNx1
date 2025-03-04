import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from './pokemon-card.component';

// Create a test host component
@Component({
  template: `<app-pokemon-card [pokemonUrl]="pokemonUrl"></app-pokemon-card>`,
  imports: [PokemonCardComponent],
})
class TestHostComponent {
  pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/25';
}

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let pokemonServiceMock: jest.Mocked<PokemonService>;
  let messageServiceMock: jest.Mocked<MessageService>;

  beforeEach(async () => {
    // MessageService mock
    messageServiceMock = {
      add: jest.fn(),
    } as unknown as jest.Mocked<MessageService>;

    // PokemonService mock
    pokemonServiceMock = {
      fetchPokemonDetails: jest.fn().mockReturnValue(
        of({
          name: 'Pikachu',
          sprites: { front_default: 'pikachu.png' },
          types: [{ type: { name: 'Electric' } }],
        })
      ),
    } as unknown as jest.Mocked<PokemonService>;

    // ActivatedRoute mock
    const activatedRouteMock = {
      snapshot: { paramMap: { get: jest.fn().mockReturnValue('25') } },
    };

    // Create a more complete Router mock
    const routerMock = {
      navigate: jest.fn(),
      navigateByUrl: jest.fn(),
      createUrlTree: jest.fn().mockReturnValue({} as UrlTree),
      serializeUrl: jest.fn().mockReturnValue(''),
      events: of(),
      url: '',
      parseUrl: jest.fn().mockReturnValue({} as UrlTree),
      isActive: jest.fn().mockReturnValue(false),
    };

    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent, TestHostComponent],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    // Create the host component fixture
    hostFixture = TestBed.createComponent(TestHostComponent);

    // Get the child component instance from the host fixture
    const childDebugElement = hostFixture.debugElement.children[0];
    component = childDebugElement.componentInstance;

    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemon data when pokemonUrl is provided', () => {
    // Verify the service was called with the correct URL
    expect(pokemonServiceMock.fetchPokemonDetails).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/25'
    );

    // Verify the pokemon data was set correctly
    expect(component.pokemon).toBeDefined();
    expect(component.pokemon.name).toBe('Pikachu');
  });
});
