import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  QuerySnapshot
} from '@angular/fire/compat/firestore';
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
      .get()
      .pipe(
        map((doc: DocumentSnapshot<DocumentData>) => {
          const post = transformPostResponseToPost(doc.data() as PostResponse);
          post.id = doc.id;
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
      .get()
      .pipe(
        map((query: QuerySnapshot<DocumentData>) => {
          const comments = query.docs.map(doc => {
            const comment = transformCommentResponoseToComment(
              doc.data() as CommentResponse
            );
            comment.id = doc.id;
            return comment;
          });
          return buildCommentsToTree(comments, postId);
        })
      );
  }
}
