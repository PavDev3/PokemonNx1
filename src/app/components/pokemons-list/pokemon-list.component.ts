import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonList } from 'src/app/interfaces/pokemons.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent implements OnInit {
  public pokemonService = inject(PokemonService);
  public pokemons = signal<PokemonList[]>([]);
  public pokemonId = signal<number>(0);
  public error: string | null = null;

  // Initialize the component
  ngOnInit(): void {
    this.pokemonService.fetchPokemons().subscribe({
      next: (data: PokemonList[]) => {
        this.pokemons.set(data);
        console.log('Pokemons fetched successfully', data);
      },
      error: (err) => {
        this.error = 'Failed to fetch pokemons';
        console.error('Error fetching pokemons', err);
      },
    });
  }
}
