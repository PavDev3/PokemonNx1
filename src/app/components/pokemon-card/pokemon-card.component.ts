import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemons.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent implements OnInit {
  public pokemonService = inject(PokemonService);
  public pokemonUrl = input.required<string>();
  pokemon!: Pokemon;

  ngOnInit(): void {
    this.pokemonService
      .fetchPokemonDetails(this.pokemonUrl())
      .subscribe((pokemon) => {
        this.pokemon = pokemon;
      });
  }
}
