import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail.component';

@NgModule({
  imports: [CommonModule, UserDetailComponent],
  exports: [UserDetailComponent],
})
export class UserDetailModule {}
