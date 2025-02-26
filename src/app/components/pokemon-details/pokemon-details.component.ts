import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemons.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  imports: [CommonModule],
  templateUrl: './pokemon-details.component.html',
})
export class PokemonDetailsComponent implements OnInit {
  pokemonService = inject(PokemonService);
  route = inject(ActivatedRoute);
  pokemonDetails = signal<Pokemon | null>(null);

  ngOnInit(): void {
    // We get the id from the url
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      // if the id is not null, we fetch the pokemon details
      if (id) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        this.pokemonService.fetchPokemonDetails(url).subscribe({
          next: (data) => this.pokemonDetails.set(data),
          error: (err) => console.error('Error al obtener detalles:', err),
        });
      }
    });
  }
}
