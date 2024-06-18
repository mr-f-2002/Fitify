import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import ExerciseCard from '../../component/ExerciseCard';


export default function FullBody({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ExerciseCard 
                text={"Burpees"} 
                gif={require("../../assets/Burpees.gif")} 
                cal={0.5}  // Calorie per rep
                time={1.5} // Time per rep
            />
            <ExerciseCard 
                text={"Jumping Jacks"} 
                gif={require("../../assets/Jumping Jacks.gif")} 
                cal={0.4}  // Calorie per rep
                time={1}   // Time per rep
            />
            <ExerciseCard 
                text={"Mountain Climbers"} 
                gif={require("../../assets/Mountain Climbers.gif")} 
                cal={0.6}  // Calorie per rep
                time={1.5} // Time per rep
            />
            <ExerciseCard 
                text={"Kettlebell Swings"} 
                gif={require("../../assets/Kettlebell Swings.gif")} 
                cal={1}    // Calorie per rep
                time={1}   // Time per rep
            />
            <ExerciseCard 
                text={"Rowing"} 
                gif={require("../../assets/Rowing.gif")} 
                cal={0.75} // Calorie per rep
                time={1.5} // Time per rep
            />
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container:{
        // flex: 1
        paddingVertical: 10,
        backgroundColor: '#FFF2D7',
    },
    img:{
        width: '96%',
        height: 190,
        elevation: 5,
        borderRadius: 15,
        overflow: 'hidden',
        margin: '2%'
    }
})

