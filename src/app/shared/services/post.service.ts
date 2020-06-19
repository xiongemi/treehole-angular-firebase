import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class PostService {
  constructor(private firestore: AngularFirestore) {}

  public like(postId: string, uuid: string): Observable<DocumentReference> {
    return from(
      this.firestore
        .collection('posts')
        .doc(postId)
        .collection('likes')
        .add({ uuid, createdAt: new Date() })
    );
  }

  public uncheckLike(postId: string, uuid: string): Observable<any> {
    return this.firestore
      .collection('posts')
      .doc(postId)
      .collection('likes', ref => ref.where('uuid', '==', uuid))
      .get()
      .pipe(
        tap(querySnapshot => {
          querySnapshot.docs.map(doc => {
            return doc.ref.delete();
          });
        })
      );
  }

  public dislike(postId: string, uuid: string): Observable<DocumentReference> {
    return from(
      this.firestore
        .collection('posts')
        .doc(postId)
        .collection('dislikes')
        .add({ uuid, createdAt: new Date() })
    );
  }

  public uncheckDisike(postId: string, uuid: string): Observable<any> {
    return this.firestore
      .collection('posts')
      .doc(postId)
      .collection('dislikes', ref => ref.where('uuid', '==', uuid))
      .get()
      .pipe(
        tap(querySnapshot => {
          querySnapshot.docs.map(doc => {
            return doc.ref.delete();
          });
        })
      );
  }

  public comment(
    postId: string,
    comment: string,
    uuid: string
  ): Observable<DocumentReference> {
    return from(
      this.firestore
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .add({
          comment,
          uuid,
          createdAt: new Date()
        })
    );
  }
}
