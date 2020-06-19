import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/models/post.interface';
import { Comment } from '../../models/comment.interface';
import { PostDetailsService } from '../../service/post-details.service';

@Component({
  selector: 'app-post-details-home',
  templateUrl: './post-details-home.component.html'
})
export class PostDetailsHomeComponent implements OnInit, OnDestroy {
  postId: string;
  post: Post;
  comments: Comment[];

  shouldShowReplyTo = true;

  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private postDetailsService: PostDetailsService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.params
        .pipe(
          switchMap(params => {
            this.postId = params.id;
            return combineLatest([
              this.postDetailsService.getPostDetails(this.postId),
              this.postDetailsService.getComments(this.postId)
            ]);
          })
        )
        .subscribe(([post, comments]) => {
          this.post = post;
          this.comments = comments;
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showReplyTo() {
    this.shouldShowReplyTo = true;
  }

  hideReplyTo() {
    this.shouldShowReplyTo = false;
  }
}
