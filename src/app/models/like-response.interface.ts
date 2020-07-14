import { Timestamp } from '@firebase/firestore-types';

export interface LikeResponse {
  uuid: string;
  docId: string;
  createdAt: Timestamp;
}
