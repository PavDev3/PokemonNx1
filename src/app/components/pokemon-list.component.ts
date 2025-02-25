import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Pokemons } from '../interfaces/pokemons.interface';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent {
  public pokemonsList = signal<Pokemons[]>([]);
  public pokemonService = inject(PokemonService);

  constructor() {
    effect(() => {
      const newPokemons = this.pokemonService.pokemonListResource.value();
      if (newPokemons) {
        this.pokemonsList.set(newPokemons);
      }
    });
  }
}
