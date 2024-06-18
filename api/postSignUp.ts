import { doc, setDoc } from "firebase/firestore";
import { db } from '../config/firebase';

interface UserData {
  Age: number;
  Height: number;
  Weight: string;
  name: string;
  user: string;
}

const postSignUp = async (userData: UserData) => {
  try {
    const userRef = doc(db, 'users', userData.user);
    await setDoc(userRef, userData);
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export default postSignUp;
