import { Component } from '@angular/core';
import { FollowersComponent } from './followers/followers.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FollowersComponent],
  template: `<app-followers></app-followers>`,
  styles: [':host { display: block; }'],
})
export class AppComponent {}
