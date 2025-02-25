import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/pokemon-list.component').then(
        (m) => m.PokemonListComponent
      ),
  },
];
