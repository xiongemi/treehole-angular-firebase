import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsHomeComponent } from './components/posts-home/posts-home.component';

const routes: Routes = [
  {
    path: '',
    component: PostsHomeComponent,
    data: { reuse: true }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingMoodule {}
