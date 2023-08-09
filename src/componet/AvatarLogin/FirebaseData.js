import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/fibefire";


export const getAvatarFromFirestore = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const avatarUrl = userData.avatarUrl;
        // console.log('Lấy URL ảnh đại diện từ Firestore thành công.');
        return avatarUrl;
      } else {
        console.log('Không tìm thấy thông tin người dùng trong Firestore.');
        return null;
      }
    } catch (error) {
      console.error('Lỗi khi lấy URL ảnh đại diện từ Firestore:', error);
      return null;
    }
  };
  

  
  export const getUserIdByEmail = async (email) => {
    const usersRef = collection(db, 'users'); 
    const q = query(usersRef, where('email', '==', email));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // Lấy ID của người dùng từ kết quả truy vấn
      const userId = querySnapshot.docs[0].id;
      return userId;
    } else {
      console.log('Không tìm thấy người dùng có email này.');
      return null;
    }
  };
   
  