import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

const database = admin.firestore();

function updateLikesDislikesCountOnPost(
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  collectionName: 'likes' | 'dislikes'
) {
  functions.logger.info('Start to update count for ' + collectionName);

  // Get whether users have add or cancel a like/dislike
  let increment: number;
  if (change.after.exists && !change.before.exists) {
    increment = 1;
  } else if (!change.after.exists && change.before.exists) {
    increment = -1;
  } else {
    return;
  }

  // Get the parent doc that contains the likesCount/dislikesCount key
  const likesOrDislikesCollectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> =
    change.after.ref.parent;
  const parentDocRef = likesOrDislikesCollectionRef.parent;
  if (!parentDocRef) {
    return;
  }
  functions.logger.info(increment, parentDocRef);

  return database.runTransaction((transaction) => {
    return transaction.get(parentDocRef).then((docRef) => {
      // Get the current likesCount/dislikesCount
      const currentCount = docRef.data()?.[collectionName + 'Count'] ?? 0;
      // Update the doc with the count and increment
      const updateValue: any = {};
      updateValue[collectionName + 'Count'] = currentCount + increment;
      functions.logger.info(
        'Count updated for ' + collectionName,
        updateValue,
        parentDocRef
      );

      return transaction.update(parentDocRef, updateValue);
    });
  });
}

exports.likeAPost = functions.firestore
  .document('posts/{postId}/likes/{likesId}')
  .onWrite((change) => {
    return updateLikesDislikesCountOnPost(change, 'likes');
  });

exports.dislikeAPost = functions.firestore
  .document('posts/{postId}/dislikes/{dislikeId}')
  .onWrite((change) => {
    return updateLikesDislikesCountOnPost(change, 'dislikes');
  });

exports.likeAComment = functions.firestore
  .document('posts/{postId}/comments/{commentId}/likes/{likesId}')
  .onWrite((change) => {
    return updateLikesDislikesCountOnPost(change, 'likes');
  });

exports.dislikeAComment = functions.firestore
  .document('posts/{postId}/comments/{commentId}/dislikes/{dislikeId}')
  .onWrite((change) => {
    return updateLikesDislikesCountOnPost(change, 'dislikes');
  });

exports.commentsCount = functions.firestore
  .document('posts/{postId}/comments/{commentsId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    if (data.parentDocId !== context.params.postId) {
      return;
    }

    const postRef = database.collection('posts').doc(context.params.postId);
    const commentsRef = postRef.collection('comments');
    return database.runTransaction((transaction) => {
      return transaction
        .get(commentsRef.where('parentDocId', '==', context.params.postId))
        .then((query) => {
          const count = query.size;
          return transaction.update(postRef, { commentsCount: count });
        });
    });
  });
