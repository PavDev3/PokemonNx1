import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonList } from 'src/app/interfaces/pokemons.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { SearchBoxComponent } from '../../shared/searchBox/searchBox.component';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, PokemonCardComponent, SearchBoxComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent implements OnInit {
  pokemonService = inject(PokemonService);
  pokemons = signal<PokemonList[]>([]);
  pokemonId = signal<number>(0);
  filteredPokemons = signal<PokemonList[]>([]);

  error: string | null = null;

  // Initialize the component
  ngOnInit(): void {
    this.pokemonService.fetchPokemons().subscribe({
      next: (data: PokemonList[]) => {
        this.pokemons.set(data);
        this.filteredPokemons.set(data.slice(0, 20));
      },
      error: (err) => {
        this.error = 'Failed to fetch pokemons';
        console.error('Error fetching pokemons', err);
      },
    });
  }

  // Search for a pokemon by name
  onSearchResult(result: string) {
    console.log('result', result);
    if (result.length > 0) {
      this.filteredPokemons.set(
        this.pokemons().filter((pokemon) => {
          return pokemon.name.toLowerCase().includes(result.toLowerCase());
        })
      );
    } else {
      this.filteredPokemons.set(this.pokemons().slice(0, 20));
    }
  }
}
