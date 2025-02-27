import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
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
  pokemons: Pokemon[] = [];

  fetchPokemons(): Observable<PokemonList[]> {
    // We don't need do a fetch if we already have the pokemons
    if (this.pokemons.length > 0) {
      console.log('Pokemons ya guardados:', this.pokemons.length);
      return of(this.pokemons);
    }
    return this.http.get<PokemonListResponse>(this.baseUrl).pipe(
      map((response) => response.results),
      tap((results) => {
        this.pokemons = results; // We save the pokemons in the service
        console.log('Pokemons guardados en el servicio:', this.pokemons.length);
      })
    );
  }

  fetchPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }
}
