import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
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

  navigateToDetails() {
    this.router.navigate(['/details', this.pokemon.id]);
    console.log(this.pokemon.id);
  }
}
