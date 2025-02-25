import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon, PokemonResponse } from '../interfaces/pokemons.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';

  readonly http = inject(HttpClient);
  public pokemons = signal<Pokemon[]>([]);

  fetchPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<PokemonResponse>(this.apiUrl)
      .pipe(map((response) => response.results));
  }
}
