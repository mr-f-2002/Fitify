import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import ExerciseCard from '../../component/ExerciseCard';

export default function CoreBody({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ExerciseCard 
                text={"Plank"} 
                gif={require("../../assets/Plank.gif")} 
                cal={0.2}  // Calorie per rep (plank holds usually have a low calorie burn per second, adjusted for typical short hold)
                time={1}   // Time per rep (per second)
            />
            <ExerciseCard 
                text={"Sit-Ups"} 
                gif={require("../../assets/Sit-Ups.gif")} 
                cal={0.3}  // Calorie per rep
                time={2}   // Time per rep
            />
            <ExerciseCard 
                text={"Russian Twists"} 
                gif={require("../../assets/Russian Twists.gif")} 
                cal={0.15} // Calorie per rep (per twist)
                time={1}   // Time per rep (per twist)
            />
            <ExerciseCard 
                text={"Leg Raises"} 
                gif={require("../../assets/Leg Raises.gif")} 
                cal={0.25} // Calorie per rep
                time={3}   // Time per rep
            />
            <ExerciseCard 
                text={"Bicycle Crunches"} 
                gif={require("../../assets/Bicycle Crunches.gif")} 
                cal={0.3}  // Calorie per rep (per crunch)
                time={1.5} // Time per rep (per crunch)
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1
        paddingVertical: 10,
        backgroundColor: '#FFF2D7',
    },
    img: {
        width: '96%',
        height: 190,
        elevation: 5,
        borderRadius: 15,
        overflow: 'hidden',
        margin: '2%'
    }
});
