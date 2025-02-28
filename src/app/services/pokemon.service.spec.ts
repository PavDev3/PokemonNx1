import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MessageService, useValue: {} }, // Mock for MessageService
      ],
    });
    service = TestBed.inject(PokemonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch pokemons', () => {
    service.fetchPokemons().subscribe((pokemons) => {
      expect(pokemons.length).toBe(1304);
    });

    const req = httpTestingController.expectOne(
      'https://pokeapi.co/api/v2/pokemon/?limit=1304'
    );
    expect(req.request.method).toBe('GET');
    req.flush({
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
    });
  });
});
