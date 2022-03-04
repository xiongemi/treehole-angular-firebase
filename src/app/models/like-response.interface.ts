import { firestore } from 'firebase-admin';

export interface LikeResponse {
  uuid: string;
  parentDocId: string;
  createdAt?: firestore.Timestamp;
}
