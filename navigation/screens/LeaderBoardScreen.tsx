// screens/LeaderBoardScreen.js
import React, {useContext , useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native';

import { GlobalContext } from '../../GlobalState';
// import { Text } from 'react-native';
import {doc, getDoc, query, where} from "firebase/firestore";
import { db } from '../../config/firebase';
import {getFirestore , collection , getDocs , updateDoc , addDoc} from 'firebase/firestore';


const calculateScore = (userInfo, dailyInfo) => {
    const heightWeight = 1; // Weight for height
    const weightWeight = 1; // Weight for weight
    const stepsWeight = 1; // Weight for steps
    const calorieOutWeight = 10; // Weight for calorie out
    const calorieInWeight = 1; // Weight for calorie in

    // print the formula
    // console.log(`Score = ${userInfo.Height} * ${heightWeight} + ${userInfo.Weight} * ${weightWeight} + (${dailyInfo.steps || 0}) * ${stepsWeight} + (${dailyInfo.calorieOut || 0}) * ${calorieOutWeight} - (${dailyInfo.calorieIn || 0}) * ${calorieInWeight} = ${userInfo.Height * heightWeight + userInfo.Weight * weightWeight + (dailyInfo.steps || 0) * stepsWeight + (dailyInfo.calorieOut || 0) * calorieOutWeight - (dailyInfo.calorieIn || 0) * calorieInWeight}`);


    return (
        userInfo.Height * heightWeight +
        userInfo.Weight * weightWeight +
        (dailyInfo.steps || 0) * stepsWeight +
        (dailyInfo.calorieOut || 0) * calorieOutWeight -
        (dailyInfo.calorieIn || 0) * calorieInWeight
    );
};

const getRankedUsers = async () => {
    try {
        const usersQuerySnapshot = await getDocs(collection(db, 'users'));
        const rankedUsersMap = new Map(); // Using Map to store unique users

        for (const userDoc of usersQuerySnapshot.docs) {
            const userInfo = userDoc.data();
            // console.log('User Info:', userInfo); // Log userInfo to debug

            // Check if userInfo.user is defined
            if (!userInfo.user) {
                console.error('Missing user field in userInfo:', userInfo);
                continue; // Skip this user if user field is missing
            }

            const dailyInfoQuerySnapshot = await getDocs(query(collection(db, 'dailyInfo'), where('user', '==', userInfo.user)));
            let totalScore = 0;
            let totalDailyInfoCount = 0;

            dailyInfoQuerySnapshot.forEach(dailyInfoDoc => {
                const dailyInfo = dailyInfoDoc.data();
                totalScore += calculateScore(userInfo, dailyInfo);
                totalDailyInfoCount++;
            });

            // Calculate average score per day if there's at least one daily info entry
            const averageScore = totalDailyInfoCount > 0 ? totalScore / totalDailyInfoCount : 0;

            // Add user to the ranked users map
            rankedUsersMap.set(userInfo.user, {
                id: userInfo.user,
                name: userInfo.name,
                score: averageScore,
            });
        }

        // Convert map values to an array and sort by score in descending order
        const rankedUsers = Array.from(rankedUsersMap.values()).sort((a, b) => b.score - a.score);

        return rankedUsers;
    } catch (error) {
        console.error('Error fetching and ranking users:', error);
        return [];
    }
};

const randomImages = [
    require('../../assets/male/1.png'),
    require('../../assets/male/2.png'),
    require('../../assets/male/3.png'),
    require('../../assets/male/4.png'),
    require('../../assets/male/5.png'),
    require('../../assets/male/6.png'),
    require('../../assets/male/7.png'),
    require('../../assets/male/8.png'),
    require('../../assets/male/9.png'),
    require('../../assets/male/10.png'),
  ];

// Usage
getRankedUsers().then(rankedUsers => {
    // console.log('Ranked users:', rankedUsers);
});

//mock screen
export default function LeaderBoardScreen() {
    const [rankedUsers, setRankedUsers] = useState([]); // State to store ranked users

    useEffect(() => {
        // Fetch and set the ranked users when the component mounts
        getRankedUsers().then(users => {
            setRankedUsers(users);
        });
    }, []); // Empty dependency array to ensure useEffect runs only once
    const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
    return (
        <View style={styles.container}>
            {/*<Text style={styles.rankText}>Your Rank: 1</Text>*/}
            <Text style={styles.sectionTitle}>Combined Rank</Text>
            <FlatList
                data={rankedUsers} // Use rankedUsers state to populate the FlatList
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image style={styles.avatar} source={randomImage} />
                        <View style={styles.details}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.value}>{item.score.toFixed(2)}</Text>
                        </View>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF2D7',
        padding: 20
    },
    rankText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#74512D',
        margin: 10,
        textAlign: 'right',
        marginRight: 20,
        position: 'absolute',
        right: 0,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20,
        padding: 10
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F4E1',
        padding: 15,
        borderRadius: 15,
        marginVertical: 5,
        marginHorizontal: 5,
        elevation: 3,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#543310',
    },
    list: {
        backgroundColor: '#FFF2D7',
    },
});
