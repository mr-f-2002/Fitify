import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../GlobalState';
import { View, Text, Image, StyleSheet, Modal, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {doc, getDoc, query, where} from "firebase/firestore";
import { db } from '../../config/firebase';
import {getFirestore , collection , getDocs , updateDoc , addDoc} from 'firebase/firestore';

export default function ProfileScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [tempName, setTempName] = useState('');
    const [tempAge, setTempAge] = useState('');
    const [tempFeet, setTempFeet] = useState('');
    const [tempInch, setTempInch] = useState('');
    const [tempWeight, setTempWeight] = useState('');
    const serial = Math.floor(Math.random() * 10) + 1;
    const selectedImage = maleImages[serial];
    
    const { globalState, setGlobalState } = useContext(GlobalContext);

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

        // Add rank to each user
        rankedUsers.forEach((user, index) => {
            user.rank = index + 1;
        });

        // globalState.totalUser = rankedUsers.length;
        // globalState.rank = rankedUsers.findIndex(user => user.id === globalState.user) + 1;
        setGlobalState(prevState => ({
            ...prevState,
            totalUser: rankedUsers.length,
            rank: rankedUsers.findIndex(user => user.id === globalState.user) + 1
        }));

        return {
            rankedUsers,
            totalCount: rankedUsers.length
        };
    } catch (error) {
        console.error('Error fetching and ranking users:', error);
        return {
            rankedUsers: [],
            totalCount: 0
        };
    }
};

    getRankedUsers();


    const openModal = () => {
        setTempName(globalState.name);
        setTempAge(globalState.age.toString());
        const totalInches = globalState.height * 39.3701;
        setTempFeet(Math.floor(totalInches / 12).toString());
        setTempInch(Math.round(totalInches % 12).toString());
        setTempWeight(globalState.weight.toString());
        setModalVisible(true);
    };

    const closeModal = () => setModalVisible(false);

    const handleSubmit = () => {
        setGlobalState(prevState => ({
            ...prevState,
            name: tempName,
            age: parseInt(tempAge),
            height: ((parseInt(tempFeet) * 12) + parseInt(tempInch)) * 0.0254,
            weight: parseInt(tempWeight)
        }));
        closeModal();
    };

    const logOut = () => {
        setGlobalState(prevState => ({
            ...prevState,
            isLoggedIn: false,
            user: null,
        }));
        navigation.navigate('Welcome');
    }

    const bmi = globalState.weight / (globalState.height ** 2);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFF2D7' }}>
            <View style={styles.profileContainer}>
                <Image style={styles.profileImage} source={selectedImage} />
                <View style={styles.profileDetails}>
                    <Text style={styles.profileName}>{globalState.name}</Text>
                    <Text style={styles.profileAge}>Age: {globalState.age}</Text>
                </View>
            </View>
            <View style={styles.cardsContainer}>
                <View style={[styles.card, { width: '100%' }]}>
                    <View style={styles.titlebar}>
                        <Text style={styles.title}>BMI</Text>
                        <Ionicons name="restaurant-outline" size={25} color='#6fff00' />
                    </View>
                    <Text style={styles.text}><Text style={styles.innettext}>{bmi.toFixed(2)}</Text></Text>
                </View>
                <View style={styles.card}>
                    <View style={styles.titlebar}>
                        <Text style={styles.title}>Height</Text>
                        <Ionicons name="barbell-outline" size={25} color='#6fff00' />
                    </View>
                    <Text style={styles.text}><Text style={styles.innettext}>{Math.floor(globalState.height * 100) / 100}</Text>m</Text>
                </View>
                <View style={styles.card}>
                    <View style={styles.titlebar}>
                        <Text style={styles.title}>Weight</Text>
                        <Ionicons name="fitness-outline" size={25} color='#6fff00' />
                    </View>
                    <Text style={styles.text}><Text style={styles.innettext}>{globalState.weight}</Text> kg</Text>
                </View>
                <View style={[styles.card, { width: '100%' }]}>
                    <View style={styles.titlebar}>
                        <Text style={styles.title}>Rank</Text>
                        <Ionicons name="fitness-outline" size={25} color='#6fff00' />
                    </View>
                    <Text style={styles.text}><Text style={styles.innettext}>{globalState.rank}</Text> /{globalState.totalUser}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.openButton} onPress={openModal}>
                <Text style={styles.openButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.openButton2} onPress={logOut}>
                <Ionicons name="log-out" color={"#fff"} size={30} onPress={logOut}/>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Edit Profile</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={tempName}
                            onChangeText={setTempName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Age"
                            value={tempAge}
                            keyboardType="numeric"
                            onChangeText={setTempAge}
                        />
                        <View style={styles.heightContainer}>
                            <TextInput
                                style={styles.inputHalf}
                                placeholder="Feet"
                                value={tempFeet}
                                keyboardType="numeric"
                                onChangeText={setTempFeet}
                            />
                            <TextInput
                                style={styles.inputHalf}
                                placeholder="Inches"
                                value={tempInch}
                                keyboardType="numeric"
                                onChangeText={setTempInch}
                            />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Weight"
                            value={tempWeight}
                            keyboardType="numeric"
                            onChangeText={setTempWeight}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
                                <Text style={styles.modalButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}


const maleImages = {
    1: require('../../assets/male/1.png'),
    2: require('../../assets/male/2.png'),
    3: require('../../assets/male/3.png'),
    4: require('../../assets/male/4.png'),
    5: require('../../assets/male/5.png'),
    6: require('../../assets/male/6.png'),
    7: require('../../assets/male/7.png'),
    8: require('../../assets/male/8.png'),
    9: require('../../assets/male/9.png'),
    10: require('../../assets/male/10.png'),
  };
  

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#74512D',
        marginBottom: 20,
        borderColor: '#eaeaea',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 40,
        marginRight: 20,
    },
    profileDetails: {
        flex: 1,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff'
    },
    profileAge: {
        fontSize: 16,
        color: '#e3e3e3',
    },
    cardsContainer: {
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%',
    },
    card: {
        backgroundColor: '#F8F4E1',
        padding: 
        20,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#eaeaea',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: '49%'
    },
    titlebar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    innettext: {
        fontWeight: 'bold',
        fontSize: 35,
    },
    openButton: {
        backgroundColor: '#B99470',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 20,
        elevation: 5,
    },
    openButton2: {
        // backgroundColor: '#B99470',
        position: 'absolute',
        top:0,
        right : 0,
        alignItems: 'center',
        margin: 20,
        elevation: 1,
        padding: 5,
        // borderRadius: 5,
        // width:40,
        // height: 40
    },
    openButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#FF0000',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: '#fffcf0',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    heightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    inputHalf: {
        width: '48%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        backgroundColor: '#B5C18E',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    modalButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500'
    },
    closeButton: {
        backgroundColor: '#7E3517',
    },
    closeButtonText: {
        color: '#fff',
    },
});

