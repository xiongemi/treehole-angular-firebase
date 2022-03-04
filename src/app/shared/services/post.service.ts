import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentData,
  DocumentReference,
  QuerySnapshot
} from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LikeRequest } from '../../models/like-request.interface';
import { LikeResponse } from '../../models/like-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private firestore: AngularFirestore) {}

  public addLikeDislike(
    collectionName: 'likes' | 'dislikes',
    uuid: string,
    postId: string,
    commentId?: string
  ): Observable<DocumentReference> {
    const request: LikeRequest = {
      uuid,
      createdAt: new Date(),
      parentDocId: commentId || postId
    };

    return from(
      this.getParentDocRef(postId, commentId)
        .collection(collectionName)
        .add(request)
    );
  }

  public cancelLikeDislike(
    collectionName: 'likes' | 'dislikes',
    uuid: string,
    postId: string,
    commentId?: string
  ): Observable<QuerySnapshot<DocumentData>> {
    return this.getParentDocRef(postId, commentId)
      .collection(collectionName, ref => ref.where('uuid', '==', uuid))
      .get()
      .pipe(
        tap(querySnapshot => {
          querySnapshot.docs.map(doc => {
            return doc.ref.delete();
          });
        })
      );
  }

  public getUserLikes(uuid: string): Observable<LikeResponse[]> {
    return this.firestore
      .collectionGroup<LikeResponse>('likes', ref =>
        ref.where('uuid', '==', uuid)
      )
      .get()
      .pipe(
        map((query: QuerySnapshot<DocumentData>) => {
          return query.docs.map(doc => {
            return doc.data() as LikeResponse;
          });
        })
      );
  }

  public getUserDislikes(uuid: string): Observable<LikeResponse[]> {
    return this.firestore
      .collectionGroup<LikeResponse>('dislikes', ref =>
        ref.where('uuid', '==', uuid)
      )
      .get()
      .pipe(
        map((query: QuerySnapshot<DocumentData>) => {
          return query.docs.map(doc => {
            return doc.data() as LikeResponse;
          });
        })
      );
  }

  private getParentDocRef(postId: string, commentId?: string) {
    let parentDocRef = this.firestore.collection('posts').doc(postId);
    if (commentId) {
      parentDocRef = parentDocRef.collection('comments').doc(commentId);
    }
    return parentDocRef;
  }
}
