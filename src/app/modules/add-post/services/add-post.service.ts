import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';

import { Language } from 'src/app/models/language.type';
import { Post } from 'src/app/models/post.interface';

@Injectable()
export class AddPostService {
  constructor(private firestore: AngularFirestore) {}

  savePost(title: string, message: string, uuid: string, language: Language) {
    const post: Post = {
      title,
      message,
      language,
      createdAt: new Date(),
      likesCount: 0,
      commentsCount: 0,
      dislikesCount: 0,
      uuid,
    };
    return from(this.firestore.collection('posts').add(post));
  }
}
