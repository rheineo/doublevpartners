import { Component } from '@angular/core';
import { UserDetailComponent } from './user-detail/user-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserDetailComponent],
  template: `<app-user-detail></app-user-detail>`,
  styles: [':host { display: block; }'],
})
export class AppComponent {}
