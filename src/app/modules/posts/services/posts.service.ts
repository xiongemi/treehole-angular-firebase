import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  CollectionReference,
  QuerySnapshot
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { Language } from 'src/app/models/language.type';
import {
  PostResponse,
  transformPostResponseToPost
} from 'src/app/models/post-response.interface';
import { Post } from 'src/app/models/post.interface';
import { SortBy, SortByRequest } from '../../../models/sort-by.enum';

@Injectable()
export class PostsService {
  constructor(private firestore: AngularFirestore) {}

  getPosts(
    language: Language = 'en',
    sortBy: SortBy,
    lastVisited = null
  ): Observable<Post[]> {
    const { orderByField, orderByDirection } = SortByRequest[sortBy];

    return this.firestore
      .collection<PostResponse>('posts', (ref: CollectionReference) => {
        let query = ref
          .where('language', '==', language)
          .orderBy(orderByField, orderByDirection);
        if (lastVisited) {
          query = ref.startAfter(lastVisited);
        }
        return query;
      })
      .get()
      .pipe(
        map((query: QuerySnapshot<PostResponse>) => {
          return query.docs.map(doc => {
            const post = transformPostResponseToPost(
              doc.data()
            );
            post.id = doc.id;
            return post;
          });
        })
      );
  }
}
