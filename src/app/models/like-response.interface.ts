import { Timestamp } from 'firebase/firestore-types';

export interface LikeResponse {
  uuid: string;
  parentDocId: string;
  createdAt?: Timestamp;
}
