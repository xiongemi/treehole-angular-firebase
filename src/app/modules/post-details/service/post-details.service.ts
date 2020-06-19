import { Injectable } from '@angular/core';
import {
  Action,
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  PostResponse,
  transformPostResponseToPost
} from 'src/app/models/post-response.interface';
import { Post } from 'src/app/models/post.interface';
import {
  CommentResponse,
  transformCommentResponoseToComment
} from '../models/comment-response.interface';
import { Comment } from '../models/comment.interface';
import { buildCommentsToTree } from './comments.utils';

@Injectable()
export class PostDetailsService {
  constructor(private firestore: AngularFirestore) {}

  public getPostDetails(postId: string): Observable<Post> {
    return this.firestore
      .collection('posts')
      .doc(postId)
      .snapshotChanges()
      .pipe(
        map((doc: Action<DocumentSnapshot<PostResponse>>) => {
          const post = transformPostResponseToPost(doc.payload.data());
          post.id = doc.payload.id;
          return post;
        })
      );
  }

  public saveComment(
    comment: Comment,
    postId: string
  ): Observable<DocumentReference> {
    return from(
      this.firestore
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .add(comment)
    );
  }

  public getComments(postId: string): Observable<Comment[]> {
    return this.firestore
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .snapshotChanges()
      .pipe(
        map((docs: DocumentChangeAction<CommentResponse>[]) => {
          const comments = docs.map(doc => {
            const comment = transformCommentResponoseToComment(
              doc.payload.doc.data()
            );
            comment.id = doc.payload.doc.id;
            return comment;
          });
          return buildCommentsToTree(comments, postId);
        })
      );
  }
}
