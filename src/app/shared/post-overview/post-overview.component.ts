import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/post.interface';

@Component({
  selector: 'app-post-overview',
  templateUrl: './post-overview.component.html',
  styleUrls: ['./post-overview.component.css']
})
export class PostOverviewComponent {
  @Input() post: Post;
  @Input() showDetails = false;
}
