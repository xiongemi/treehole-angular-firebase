import { Injectable } from '@angular/core';
import {
  Action,
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot,
  CollectionReference
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  PostResponse,
  transformPostResponseToPost
} from 'src/app/models/post-response.interface';
import { Post } from 'src/app/models/post.interface';
import { SortBy, SortByRequest } from '../../../models/sort-by.enum';
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
    comment: string,
    uuid: string,
    parentDocId: string,
    postId: string
  ): Observable<DocumentReference> {
    const request: Comment = {
      comment,
      uuid,
      parentDocId,
      createdAt: new Date(),
      likesCount: 0,
      dislikesCount: 0
    };
    return from(
      this.firestore
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .add(request)
    );
  }

  public getComments(postId: string, sortBy: SortBy): Observable<Comment[]> {
    const { orderByField, orderByDirection } = SortByRequest[sortBy];
    return this.firestore
      .collection('posts')
      .doc(postId)
      .collection('comments', (ref: CollectionReference) =>
        ref.orderBy(orderByField, orderByDirection)
      )
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
