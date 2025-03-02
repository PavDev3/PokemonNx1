import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Pokemon,
  PokemonList,
  PokemonListResponse,
} from '../interfaces/pokemons.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1304';
  readonly messageService = inject(MessageService);
  readonly http = inject(HttpClient);
  // We save the pokemons in the service
  pokemons: PokemonList[] = [];
  // We save the pokemon details in the service
  pokemonMap = new Map<string, Pokemon>();

  fetchPokemons(): Observable<PokemonList[]> {
    // We don't need do a fetch if we already have the pokemons
    if (this.pokemons.length > 0) {
      return of(this.pokemons);
    }
    return this.http.get<PokemonListResponse>(this.baseUrl).pipe(
      map((response) => response.results),
      tap((results) => {
        this.pokemons = results; // We save the pokemons in the service
      }),
      catchError(() => {
        this.showError('Error fetching pokemons');
        return of([]);
      })
    );
  }

  fetchPokemonDetails(url: string): Observable<Pokemon> {
    // if we have the pokemon details in the service, we return the details from Map
    if (this.pokemonMap.has(url)) {
      return of(this.pokemonMap.get(url) as Pokemon); // We cast to Pokemon because we are sure that the pokemon is in the map
    }
    // if we don't have the pokemon details in the service, we fetch the details from the API
    return this.http.get<Pokemon>(url).pipe(
      tap((pokemon) => {
        this.pokemonMap.set(url, pokemon);
      }),
      catchError(() => {
        this.showError('Error fetching pokemons');
        return of({} as Pokemon);
      })
    );
  }

  private showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
