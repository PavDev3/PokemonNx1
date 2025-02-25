import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Pokemons } from 'src/app/interfaces/pokemons.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent {
  //Inject the service
  public pokemonService = inject(PokemonService);
  // Create a signal to store the list of pokemons
  public pokemonsList = signal<Pokemons[]>([]);

  constructor() {
    // This effect will run every time the pokemonList is changes
    effect(() => {
      const newPokemons = this.pokemonService.pokemonListResource.value();
      if (newPokemons) {
        this.pokemonsList.set(newPokemons);
      }
    });
  }
}
