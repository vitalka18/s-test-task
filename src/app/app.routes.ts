import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/users/routes/users/users.component').then(
        module => module.UsersComponent
      ),
  },
];
