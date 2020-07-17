import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentReplyToComponent } from './components/comment-reply-to/comment-reply-to.component';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { PostDetailsHomeComponent } from './components/post-details-home/post-details-home.component';
import { PostDetailsRoutingModule } from './post-details-routing.module';
import { PostDetailsService } from './service/post-details.service';

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
    ReactiveFormsModule
  ],
  providers: [PostDetailsService]
})
export class PostDetailsModule {}
