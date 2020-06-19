import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostDetailsHomeComponent } from './components/post-details-home/post-details-home.component';

const routes: Routes = [
  {
    path: ':id',
    component: PostDetailsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostDetailsRoutingModule {}
