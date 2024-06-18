import React, { createContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import {doc, getDoc} from "firebase/firestore";
import { db } from './config/firebase';
import {getFirestore , collection , getDocs , updateDoc , addDoc} from 'firebase/firestore';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    name: 'john Doe',
    age: 24,
    height: 1.753,
    weight: 68,
    rank: 0,
    totalUser: 0,
    steps: 115,
    calorieIn: 0,
    calorieOut: 0,
    exercise: 0,
    walk: 5,

    user: null,
    isAuthenticated: false,
    theme: 'light',
  });


  useEffect(() => {
    const fetchGlobalState = async () => {
      // console.log('fetching global state...');
      const userRef = collection(db, 'users');

      try {
        const querySnapshot = await getDocs(userRef);
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, ' => ', doc.data());
          if (doc.data().user === globalState.user) {
            setGlobalState(prevState => ({
              ...prevState,
              user: doc.data().user,
              isAuthenticated: true,
              name: doc.data().name,
              age: doc.data().Age,
              height: doc.data().Height,
              weight: doc.data().Weight,
            }));
          }
        });
      } catch (error) {
        // console.error('Error fetching user data:', error);
      }
    };
  
    fetchGlobalState();
  
    // Cleanup function if needed
    return () => {
      // Cleanup logic
    };
  }, [globalState.user]);
  

  useEffect(() => {
    const fetchGlobalState = async () => {
      // console.log('Fetching global state...');
      const dailyInfoRef = collection(db, 'dailyInfo');
      const currentDate = new Date();
      const currentDay = currentDate.getDate(); // Get the current day of the month

      try {
        const querySnapshot = await getDocs(dailyInfoRef);
        const userDailyInfo = querySnapshot.docs.find(doc => doc.data().user === globalState.user && doc.data().day === currentDay);

        if (userDailyInfo) {
          // If there's a document for the current user and day, update the state with its values
          const data = userDailyInfo.data();
          setGlobalState(prevState => ({
            ...prevState,
            walk: data.walk || 0,
            exercise: data.exercise || 0,
            calorieIn: data.calorieIn || 0,
            calorieOut: data.calorieOut || 0,
          }));
        } else {
          // If there's no document for the current day, initialize the values to 0
          setGlobalState(prevState => ({
            ...prevState,
            walk: 0,
            exercise: 0,
            calorieIn: 0,
            calorieOut: 0,
          }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchGlobalState();

    // Cleanup function if needed
    return () => {
      // Cleanup logic
    };
  }, [globalState.user]);
  
  useEffect(() => {
    const updateUserProfile = async () => {
      // console.log('updating user profile...');
      try {
        // console.log(globalState.user)
        const userDocRef = doc(db, 'users', globalState.user); // Construct the document reference
        await updateDoc(userDocRef, { // Update the document using the reference
          name: globalState.name,
          Age: globalState.age,
          Height: globalState.height,
          Weight: globalState.weight,
        });
        // console.log('User profile updated successfully');
      } catch (error) {
        // console.error('Error updating user profile:', error);
      }
    };
    

    updateUserProfile();
  }, [globalState.name, globalState.age, globalState.height, globalState.weight]);

  useEffect(() => {
    const updateDailyInfo = async () => {
      console.log('updating daily info...');
      try {
        const dailyInfoRef = collection(db, 'dailyInfo');
        const querySnapshot = await getDocs(dailyInfoRef);
        const currentDate = new Date();
        const currentDay = currentDate.getDate(); 
  
        // Find if there's an entry for the current day
        let existingEntryId = null;
        querySnapshot.forEach(doc => {
          const data = doc.data();
          if (data.user === globalState.user && data.month === 'June' && data.day === currentDay) {
            existingEntryId = doc.id;
          }
        });
  
        // If entry for current day exists, update it; otherwise, create a new one
        if (existingEntryId) {
          const dailyInfoDocRef = doc(db, 'dailyInfo', existingEntryId);
          await updateDoc(dailyInfoDocRef, {
            calorieIn: globalState.calorieIn,
            calorieOut: globalState.calorieOut,
            walk: globalState.walk,
            exercise: globalState.exercise,
          });
          // console.log('Daily info updated successfully');
        } else {
          await addDoc(collection(db, 'dailyInfo'), {
            user: globalState.user,
            month: 'June',
            day: currentDay,
            calorieIn: globalState.calorieIn,
            calorieOut: globalState.calorieOut,
            walk: globalState.walk,
            exercise: globalState.exercise,
          });
          // console.log('New daily info added successfully');
        }
      } catch (error) {
        console.error('Error updating daily info:', error);
      }
    };
  
    updateDailyInfo();
  }, [globalState.calorieIn, globalState.calorieOut, globalState.walk, globalState.exercise]);
  
  


  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
    {globalState ? children : <Text>loading...</Text>}
  </GlobalContext.Provider>
  );
};
