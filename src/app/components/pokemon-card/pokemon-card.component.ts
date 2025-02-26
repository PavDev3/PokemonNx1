import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemons.interface';

@Component({
  selector: 'app-pokemon-card',
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();
}
