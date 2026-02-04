import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./user-detail/user-detail.component').then(
        (m) => m.UserDetailComponent
      ),
  },
  {
    path: 'user/:username',
    loadComponent: () =>
      import('./user-detail/user-detail.component').then(
        (m) => m.UserDetailComponent
      ),
  },
];
