import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { PokemonList } from 'src/app/interfaces/pokemons.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { SearchBoxComponent } from '../../shared/searchBox/searchBox.component';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, PokemonCardComponent, SearchBoxComponent],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  pokemonService = inject(PokemonService);
  pokemons = signal<PokemonList[]>([]);
  filteredPokemons = signal<PokemonList[]>([]);
  error: string | null = null;
  showError = inject(MessageService);

  // Initialize the component
  ngOnInit(): void {
    this.pokemonService
      .fetchPokemons()
      // We unsubscribe from the observable when the component is destroyed
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: PokemonList[]) => {
          this.pokemons.set(data);
          this.filteredPokemons.set(data.slice(0, 20));
        },
        error: () => {
          this.showError.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to fetch pokemons',
          });
        },
      });
  }

  // Search for a pokemon by name
  onSearchResult(result: string) {
    if (result.length > 0) {
      this.filteredPokemons.set(
        this.pokemons().filter((pokemon) => {
          return pokemon.name.toLowerCase().includes(result.toLowerCase());
        })
      );
    } else {
      this.filteredPokemons.set(this.pokemons().slice(0, 20));
    }
  }
}
