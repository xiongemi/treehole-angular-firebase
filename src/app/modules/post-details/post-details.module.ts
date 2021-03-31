import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentReplyToComponent } from './components/comment-reply-to/comment-reply-to.component';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { PostDetailsHomeComponent } from './components/post-details-home/post-details-home.component';
import { PostDetailsRoutingModule } from './post-details-routing.module';
import { PostDetailsService } from './services/post-details.service';
import { PostDetailsState } from './store/post-details.state';

@NgModule({
  declarations: [
    PostDetailsHomeComponent,
    CommentReplyToComponent,
    PostCommentsComponent
  ],
  imports: [
    SharedModule,
    PostDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([PostDetailsState])
  ],
  providers: [PostDetailsService]
})
export class PostDetailsModule {}
