import React, { createContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import {doc, getDoc, query, where} from "firebase/firestore";
import { db } from '../config/firebase';
import {getFirestore , collection , getDocs , updateDoc , addDoc} from 'firebase/firestore';


console.log("api/ranking.ts is being called");

const calculateScore = (userInfo, dailyInfo) => {
    // Define your scoring logic here
    // For example, you can calculate the average steps per day, or any other metric you find sensible
    // This function should return a numeric score for each user
    return userInfo.height + userInfo.weight + (dailyInfo.calorieOut || 0) - (dailyInfo.calorieIn || 0);
};

const getRankedUsers = async () => {
    try {
        const usersQuerySnapshot = await getDocs(collection(db, 'users'));
        const rankedUsers = [];

        for (const userDoc of usersQuerySnapshot.docs) {
            const userInfo = userDoc.data();
            const dailyInfoQuerySnapshot = await getDocs(query(collection(db, 'dailyInfo'), where('user', '==', userInfo.user)));
            let totalScore = 0;
            let totalDailyInfoCount = 0;

            dailyInfoQuerySnapshot.forEach(dailyInfoDoc => {
                const dailyInfo = dailyInfoDoc.data();
                totalScore += calculateScore(userInfo, dailyInfo);
                totalDailyInfoCount++;
            });

            // Calculate average score per day
            const averageScore = totalScore / totalDailyInfoCount;

            rankedUsers.push({
                id: userInfo.user,
                name: userInfo.name,
                score: averageScore,
            });
        }

        // Sort ranked users by score in descending order
        rankedUsers.sort((a, b) => b.score - a.score);

        return rankedUsers;
    } catch (error) {
        console.error('Error fetching and ranking users:', error);
        return [];
    }
};

// Usage
getRankedUsers().then(rankedUsers => {
    console.log('Ranked users:', rankedUsers);
});

export { getRankedUsers };