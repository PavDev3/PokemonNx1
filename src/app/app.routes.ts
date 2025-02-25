import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/pokemons-list/pokemon-list.component').then(
        (m) => m.PokemonListComponent
      ),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./shared/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
