import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

  ngOnInit(): void {
    // We get the id from the url
    this.route.paramMap
      // We unsubscribe from the observable when the component is destroyed
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params.get('id');
        // if the id is not null, we fetch the pokemon details
        if (id) {
          const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
          this.pokemonService
            .fetchPokemonDetails(url)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: (data) => this.pokemonDetails.set(data),
              error: (err) => console.error('Error al obtener detalles:', err),
            });
        }
      });
  }
}
