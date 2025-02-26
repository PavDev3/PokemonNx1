import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Pokemon,
  PokemonList,
  PokemonListResponse,
} from '../interfaces/pokemons.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1304';

  readonly http = inject(HttpClient);
  public pokemons = signal<Pokemon[]>([]);
  public pokemonDetails = signal<Pokemon | null>(null);

  fetchPokemons(): Observable<PokemonList[]> {
    return this.http
      .get<PokemonListResponse>(this.baseUrl)
      .pipe(map((response) => response.results));
  }

  fetchPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  // filter the 15 first pokemons
  filterPokemons(pokemons: Pokemon[]): Pokemon[] {
    console.log(pokemons);
    return pokemons.slice(0, 15);
  }
}
