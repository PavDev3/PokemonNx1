import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { Pokemon, PokemonListResponse } from '../interfaces/pokemons.interface';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpClientMock: jest.Mocked<HttpClient>;
  let messageServiceMock: jest.Mocked<MessageService>;
  const mockPokemon: Pokemon = {
    id: 1,
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    sprites: { front_default: '' },
    types: [],
  };

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    messageServiceMock = {
      add: jest.fn(),
    } as unknown as jest.Mocked<MessageService>;

    TestBed.configureTestingModule({
      providers: [
        PokemonService,
        { provide: HttpClient, useValue: httpClientMock },
        { provide: MessageService, useValue: messageServiceMock },
      ],
    });

    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch pokemons and store them', () => {
    const mockResponse: PokemonListResponse = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      ],
    };

    // Mock the HTTP client to return the mock response
    httpClientMock.get.mockReturnValue(of(mockResponse));

    service.fetchPokemons().subscribe((pokemons) => {
      expect(pokemons).toEqual(mockResponse.results);
      expect(service.pokemons).toEqual(mockResponse.results);
    });

    expect(httpClientMock.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/?limit=1304'
    );
  });

  it('should return cached pokemons if already fetched', () => {
    const mockPokemons = [
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    ];

    service.pokemons = mockPokemons;

    service.fetchPokemons().subscribe((pokemons) => {
      expect(pokemons).toEqual(mockPokemons);
    });

    expect(httpClientMock.get).not.toHaveBeenCalled();
  });

  it('should handle fetch pokemons error and call showError', () => {
    httpClientMock.get.mockReturnValue(
      throwError(() => new Error('API Error'))
    );

    service.fetchPokemons().subscribe((pokemons) => {
      expect(pokemons).toEqual([]);
    });

    expect(messageServiceMock.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Error fetching pokemons',
    });
  });

  it('should fetch pokemon details if not cached', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/1/';

    httpClientMock.get.mockReturnValue(of(mockPokemon));

    service.fetchPokemonDetails(url).subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
      expect(service.pokemonMap.get(url)).toEqual(mockPokemon);
    });

    expect(httpClientMock.get).toHaveBeenCalledWith(url);
  });

  it('should return cached pokemon details if available', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/1/';

    service.pokemonMap.set(url, mockPokemon);

    service.fetchPokemonDetails(url).subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    expect(httpClientMock.get).not.toHaveBeenCalled();
  });
});
