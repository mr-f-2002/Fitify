import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { GlobalContext } from '../GlobalState';

export default function ExerciseCard({ text, gif, cal, time }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [reps, setReps] = useState(0);
    const { globalState, setGlobalState } = useContext(GlobalContext);

    const handleModalClose = () => {
        setModalVisible(false);
        setReps(0); // Reset reps when modal closes
    };

    const handleSubmit = () => {
        // Process the input or send it to parent component
        console.log("Reps:", reps);
        setGlobalState((prevState) => ({
            ...prevState,
            calorieOut: globalState.calorieOut + (cal*reps),
            exercise: globalState.exercise + parseFloat(((time * reps) / 60).toFixed(2)),
          }));
        handleModalClose(); // Close modal after submission
    };

    return (
        <>
            <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
                <View style={{ width: '100%', borderRadius: 15, overflow: 'hidden' }}>
                    <Image style={[styles.image]} source={gif} resizeMode="contain" />
                </View>
                <Text style={styles.text}>Name  <Text style={styles.highlight}>{text}</Text></Text>
                <Text style={styles.text}>Calorie Burn  <Text style={styles.highlight}>{cal} cal</Text> /rep</Text>
                <Text style={styles.text}>Average Time  <Text style={styles.highlight}>{time} s</Text> /rep</Text>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Enter Number of Reps</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Enter number of reps"
                            value={reps.toString()}
                            onChangeText={(text) => setReps(parseInt(text) || 0)}
                        />
                        <TouchableOpacity style={styles.submitButton}  onPress={handleSubmit}>
                            <Text style={{color: '#000', textAlign: 'center', fontWeight: '500', fontSize: 16}}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        margin: '1%',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: 125
    },
    image: {
        width: '100%',
        height: 200,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        color: '#9ea1a3'
    },
    highlight: {
        fontWeight: 'bold',
        color: '#543310',
        fontSize: 22,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fffcf0',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    submitButton:{
        width: '100%',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#B5C18E'
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 10,
    },
    closeButtonText: {
        fontSize: 25,
        fontWeight: '400',
        color: '#ccc',
    },
});
