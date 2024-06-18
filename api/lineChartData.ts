// api.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

// Helper function to get the current month and day
const getCurrentMonthAndDay = () => {
  const currentDate = new Date();
  return {
    currentMonth: currentDate.toLocaleString('default', { month: 'long' }), // e.g., 'June'
    currentDay: currentDate.getDate(), // e.g., 11
  };
};

// Fetch the last 7 days of data
export const fetchLast7DaysData = async (user: any) => {
    console.log("fetchLast7DaysData api is being called")
  const { currentMonth, currentDay } = getCurrentMonthAndDay();
  const dailyInfoRef = collection(db, 'dailyInfo');
  
  try {
    const querySnapshot = await getDocs(dailyInfoRef);
    const last7DaysData: any[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.user === user && data.month === currentMonth && data.day <= currentDay && data.day > currentDay - 7) {
        last7DaysData.push(data.calorieIn);
      }
    });
    while(last7DaysData.length < 7) last7DaysData.push(0);
    console.log(last7DaysData);
    return last7DaysData;
  } catch (error) {
    console.error('Error fetching last 7 days of data:', error);
    return [];
  }
};

// Fetch the last 30 days of data
export const fetchLast30DaysData = async (user: any) => {
    console.log("fetchLast7DaysData api is being called")
  const { currentMonth, currentDay } = getCurrentMonthAndDay();
  const dailyInfoRef = collection(db, 'dailyInfo');

  try {
    const querySnapshot = await getDocs(dailyInfoRef);
    const last30DaysData: any[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.user === user && data.month === currentMonth && data.day <= currentDay && data.day > currentDay - 30) {
        last30DaysData.push(data.calorieIn);
        // pad it out to 30 days by adding dummy 0s
      }
    });
    while(last30DaysData.length < 30) last30DaysData.push(0);
    console.log(last30DaysData);
    return last30DaysData;
  } catch (error) {
    console.error('Error fetching last 30 days of data:', error);
    return [];
  }
};

export default { fetchLast7DaysData, fetchLast30DaysData };


