import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import ExerciseCard from '../../component/ExerciseCard';


export default function ExerciseScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
           <TouchableOpacity  onPress={() => navigation.navigate('Fullbody')}
           ><Image style={styles.img} source={require('../../assets/complete.png')} resizeMode="contain" /></TouchableOpacity>
           <TouchableOpacity  onPress={() => navigation.navigate('Upperbody')}
           ><Image style={styles.img} source={require('../../assets/upper.png')} resizeMode="contain"/></TouchableOpacity>
           <TouchableOpacity  onPress={() => navigation.navigate('Corebody')}
           ><Image style={styles.img} source={require('../../assets/core.png')} resizeMode="contain"/></TouchableOpacity>
           <TouchableOpacity  onPress={() => navigation.navigate('Lowerbody')}
           ><Image style={styles.img} source={require('../../assets/lower.png')} resizeMode="contain"/></TouchableOpacity>
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




