import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentData,
  DocumentReference,
  QuerySnapshot
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LikeResponse } from 'src/app/models/like-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private firestore: AngularFirestore) {}

  public like(docId: string, uuid: string): Observable<DocumentReference> {
    return from(
      this.firestore
        .collection('likes')
        .add({ uuid, createdAt: new Date(), docId })
    );
  }

  public cancelLike(
    docId: string,
    uuid: string
  ): Observable<QuerySnapshot<DocumentData>> {
    return this.firestore
      .collection('likes', ref =>
        ref.where('uuid', '==', uuid).where('docId', '==', docId)
      )
      .get()
      .pipe(
        tap(querySnapshot => {
          querySnapshot.docs.map(doc => {
            return doc.ref.delete();
          });
        })
      );
  }

  public dislike(docId: string, uuid: string): Observable<DocumentReference> {
    return from(
      this.firestore
        .collection('dislikes')
        .add({ uuid, createdAt: new Date(), docId })
    );
  }

  public cancelDislike(
    docId: string,
    uuid: string
  ): Observable<QuerySnapshot<DocumentData>> {
    return this.firestore
      .collection('dislikes', ref =>
        ref.where('docId', '==', docId).where('uuid', '==', uuid)
      )
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
      .collection<LikeResponse>('likes', ref => ref.where('uuid', '==', uuid))
      .valueChanges();
  }

  public getUserDislikes(uuid: string): Observable<LikeResponse[]> {
    return this.firestore
      .collection<LikeResponse>('dislikes', ref =>
        ref.where('uuid', '==', uuid)
      )
      .valueChanges();
  }
}
