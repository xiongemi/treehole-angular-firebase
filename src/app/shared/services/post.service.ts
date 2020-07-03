import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  public uncheckLike(docId: string, uuid: string): Observable<any> {
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

  public uncheckDisike(docId: string, uuid: string): Observable<any> {
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
}
