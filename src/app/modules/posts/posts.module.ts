import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostsHomeComponent } from './components/posts-home/posts-home.component';
import { PostsRoutingMoodule } from './posts-routing.module';
import { PostsService } from './services/posts.service';
import { PostsState } from './store/posts.state';

@NgModule({
  declarations: [PostsHomeComponent],
  imports: [
    SharedModule,
    PostsRoutingMoodule,
    NgxsModule.forFeature([PostsState]),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PostsService]
})
export class PostsModule {}
