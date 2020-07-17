import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const database = admin.firestore();

function updateLikesDislikesCountOnPost(
  parentDocRef: FirebaseFirestore.DocumentReference<
    FirebaseFirestore.DocumentData
  >,
  collectionName: 'likes' | 'dislikes'
) {
  functions.logger.info(collectionName, parentDocRef);
  return database.runTransaction(transaction => {
    return transaction
      .get(parentDocRef.collection(collectionName))
      .then(collectionQuery => {
        const count = collectionQuery.size;
        const updateValue: any = {};
        updateValue[collectionName + 'Count'] = count;
        functions.logger.info(collectionName, updateValue, parentDocRef);

        return transaction.update(parentDocRef, updateValue);
      });
  });
}

exports.likeAPost = functions.firestore
  .document('posts/{postId}/likes/{likesId}')
  .onWrite((_, context) => {
    const postRef = database.collection('posts').doc(context.params.postId);
    return updateLikesDislikesCountOnPost(postRef, 'likes');
  });

exports.dislikeAPost = functions.firestore
  .document('posts/{postId}/dislikes/{dislikeId}')
  .onWrite((_, context) => {
    const postRef = database.collection('posts').doc(context.params.postId);
    return updateLikesDislikesCountOnPost(postRef, 'dislikes');
  });

exports.likeAComment = functions.firestore
  .document('posts/{postId}/comments/{commentId}/likes/{likesId}')
  .onWrite((_, context) => {
    const commentRef = database
      .collection('posts')
      .doc(context.params.postId)
      .collection('comments')
      .doc(context.params.commentId);
    return updateLikesDislikesCountOnPost(commentRef, 'likes');
  });

exports.dislikeAComment = functions.firestore
  .document('posts/{postId}/comments/{commentId}/dislikes/{dislikeId}')
  .onWrite((_, context) => {
    const commentRef = database
      .collection('posts')
      .doc(context.params.postId)
      .collection('comments')
      .doc(context.params.commentId);
    return updateLikesDislikesCountOnPost(commentRef, 'dislikes');
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
    return database.runTransaction(transaction => {
      return transaction
        .get(commentsRef.where('parentDocId', '==', context.params.postId))
        .then(query => {
          const count = query.size;
          return transaction.update(postRef, { commentsCount: count });
        });
    });
  });
