export interface PokemonResponse {
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url: string;

  stats: PokemonStats[];
  sprites: PokemonsSprites;
}

export interface PokemonsSprites {
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export interface PokemonStats {
  base_stat: number;
  stat: {
    name: string;
  };
}
