import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './models/app-routes.enum';

const routes: Routes = [
  {
    path: AppRoutes.Posts,
    loadChildren: () =>
      import('./modules/posts/posts.module').then(m => m.PostsModule)
  },
  {
    path: AppRoutes.Add,
    loadChildren: () =>
      import('./modules/add-post/add-post.module').then(m => m.AddPostModule)
  },
  {
    path: AppRoutes.Post,
    loadChildren: () =>
      import('./modules/post-details/post-details.module').then(
        m => m.PostDetailsModule
      )
  },
  {
    path: '',
    redirectTo: AppRoutes.Posts,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
