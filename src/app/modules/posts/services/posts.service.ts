import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  CollectionReference,
  DocumentChangeAction
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Language } from 'src/app/models/language.type';
import { PostResponse } from 'src/app/models/post-response.interface';

@Injectable()
export class PostsService {
  private lastVisited = null;

  constructor(private firestore: AngularFirestore) {}

  getPosts(
    language: Language = 'en',
    orderByField: string = 'createdAt',
    orderByDirection: 'desc' | 'asc' = 'desc',
    lastVisited = null,
    limitSize = 24
  ): Observable<DocumentChangeAction<PostResponse>[]> {
    return this.firestore
      .collection<PostResponse>('posts', (ref: CollectionReference) => {
        let query = ref
          .where('language', '==', language)
          .orderBy(orderByField, orderByDirection)
          .limit(limitSize);
        if (lastVisited) {
          query = ref.startAfter(lastVisited);
        }
        return query;
      })
      .snapshotChanges();
  }

  /* loadMorePosts(
    language: Language = 'en',
    orderByField: string = 'createdAt',
    orderByDirection: 'desc' | 'asc' = 'desc',
    limitSize = 24
  ): Observable<QuerySnapshot<DocumentData>> {
    return this.getPosts(
      language,
      orderByField,
      orderByDirection,
      this.lastVisited,
      limitSize
    );
  } */
}
