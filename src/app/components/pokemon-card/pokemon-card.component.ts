import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemons.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent implements OnInit {
  router = inject(Router);
  pokemonService = inject(PokemonService);
  pokemonUrl = input.required<string>();
  pokemon!: Pokemon;
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.pokemonService
      .fetchPokemonDetails(this.pokemonUrl())
      // We unsubscribe from the observable when the component is destroyed
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pokemon) => {
        this.pokemon = pokemon;
      });
  }
}
