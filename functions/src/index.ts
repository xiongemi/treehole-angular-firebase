import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const database = admin.firestore();

const likesRef = database.collection('likes');
const dislikesRef = database.collection('dislikes');

function updateLikesDislikesCountOnPost(
  collectionRef: FirebaseFirestore.CollectionReference<
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
      .get(collectionRef.where('docId', '==', data.docId))
      .then(collectionQuery => {
        const count = collectionQuery.size;
        const updateValue: any = {};
        updateValue[keyToUpdate] = count + incrementValue;

        return transaction.update(postRef, updateValue);
      });
  });
}

exports.like = functions.firestore
  .document('likes/{likesId}')
  .onDelete(snap =>
    updateLikesDislikesCountOnPost(likesRef, snap, 'likesCount', -1)
  );

exports.cancelLike = functions.firestore
  .document('likes/{likesId}')
  .onCreate(snap =>
    updateLikesDislikesCountOnPost(likesRef, snap, 'likesCount', 1)
  );

exports.dislike = functions.firestore
  .document('dislike/{dislikeId}')
  .onCreate(snap =>
    updateLikesDislikesCountOnPost(dislikesRef, snap, 'dislikesCount', 1)
  );

exports.cancelDislikes = functions.firestore
  .document('dislike/{dislikeId}')
  .onDelete(snap =>
    updateLikesDislikesCountOnPost(dislikesRef, snap, 'dislikesCount', -1)
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
