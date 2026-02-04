import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./followers/followers.component').then(
        (m) => m.FollowersComponent
      ),
  },
  {
    path: 'followers/:username',
    loadComponent: () =>
      import('./followers/followers.component').then(
        (m) => m.FollowersComponent
      ),
  },
];
