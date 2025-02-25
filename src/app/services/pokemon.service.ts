import { HttpClient } from '@angular/common/http';
import { inject, Injectable, resource, signal } from '@angular/core';
import { Pokemons } from '../interfaces/pokemons.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://api.example.com/pokemons'; // URL de l
  //
  public offset = signal(0);

  http = inject(HttpClient);

  pokemonListResource = resource({
    request: this.offset,
    loader: ({ request: offset }) =>
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=21&offset=${offset}`)
        .then((res) => res.json())
        .then((data) =>
          data.results.map((pokemon: Pokemons) => ({
            name: pokemon.name,
            url: pokemon.url,
          }))
        ),
  });
}
