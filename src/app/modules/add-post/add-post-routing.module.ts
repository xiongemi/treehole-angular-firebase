import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPostHomeComponent } from './components/add-post-home.component';

const routes: Routes = [
  {
    path: '',
    component: AddPostHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPostRoutingModule {}
