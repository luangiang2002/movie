import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase/fibefire';
export const GetVideoData = async (videoId) => {
  const commentsRef = collection(db, 'videos');
  const querySnapshot = await getDocs(commentsRef);

  const comments = [];
  querySnapshot.forEach((doc) => {
    comments.push({ id: doc.id, ...doc.data() });
  });

  return comments;
};

export const getCommentsByVideoId = async (videoId) => {
  const commentsRef = collection(db, 'comments');
  const q = query(commentsRef, where('videoId', '==', videoId));
  const querySnapshot = await getDocs(q);
  const comments = querySnapshot.docs.map((doc) => doc.data());
  return comments;
};