import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';
import { Pokemon } from 'src/app/interfaces/pokemons.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-details.component.html',
})
export class PokemonDetailsComponent implements OnInit {
  pokemonService = inject(PokemonService);
  route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  pokemonDetails = signal<Pokemon | null>(null);
  showError = inject(MessageService);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        // We get the id from the url
        switchMap((params) => {
          const id = params.get('id');
          // if the id is not null, we fetch the pokemon details
          if (id) {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
            return this.pokemonService.fetchPokemonDetails(url);
          }
          return [];
        })
      )
      .subscribe({
        next: (data) => this.pokemonDetails.set(data),
        error: () => {
          this.showError.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to fetch pokemon details',
          });
        },
      });
  }
}
