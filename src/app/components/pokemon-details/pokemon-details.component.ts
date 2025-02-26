import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemons.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  imports: [CommonModule],
  templateUrl: './pokemon-details.component.html',
})
export class PokemonDetailsComponent {
  pokemonService = inject(PokemonService);
  pokemonId = input.required<number>();
  pokemon!: Pokemon;
}
