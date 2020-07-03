import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const database = admin.firestore();

const likesRef = database.collection('likes');
const dislikesRef = database.collection('dislikes');

function updateLikesDislikesCount(
  collection: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >,
  snap: functions.firestore.QueryDocumentSnapshot,
  keyToUpdate: string,
  incrementValue: number
) {
  const data = snap.data();
  const postRef = database.collection('posts').doc(data.parentDocId);

  return database.runTransaction(transaction => {
    return transaction
      .get(collection.where('docId', '==', data.docId))
      .then(collectionQuery => {
        const count = collectionQuery.size;
        const updateValue: any = {};
        updateValue[keyToUpdate] = count + incrementValue;

        return transaction.update(postRef, updateValue);
      });
  });
}

exports.likeAPost = functions.firestore
  .document('likes/{likesId}')
  .onCreate(snap => updateLikesDislikesCount(likesRef, snap, 'likesCount', 1));

exports.unlikeAPost = functions.firestore
  .document('likes/{likesId}')
  .onDelete(snap => updateLikesDislikesCount(likesRef, snap, 'likesCount', -1));

exports.dislikesCount = functions.firestore
  .document('dislike/{dislikeId}')
  .onCreate(snap =>
    updateLikesDislikesCount(dislikesRef, snap, 'dislikesCount', 1)
  );

exports.dislikesCount = functions.firestore
  .document('dislike/{dislikeId}')
  .onDelete(snap =>
    updateLikesDislikesCount(dislikesRef, snap, 'dislikesCount', -1)
  );

exports.commentsCount = functions.firestore
  .document('posts/{postId}/comments/{commentsId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    if (data.parentDocId !== context.params.postId) {
      return;
    }

    const postRef = database.collection('posts').doc(context.params.postId);
    const commentsRef = postRef.collection('comments');
    return database.runTransaction(transaction => {
      return transaction
        .get(commentsRef.where('parentDocId', '==', context.params.postId))
        .then(query => {
          const count = query.size;
          const updateValue: any = { commentsCount: count + 1 };
          return transaction.update(postRef, updateValue);
        });
    });
  });
