export interface PokemonListResponse {
  results: PokemonList[];
}

export interface PokemonList {
  name: string;
  url: string;
}

export interface Pokemon {
  name: string;
  url: string;
  id?: number;
  stats?: PokemonStats[];
  sprites?: {
    front_default: string;
    other?: {
      'official-artwork'?: {
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
