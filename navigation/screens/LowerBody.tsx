import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ExerciseCard from '../../component/ExerciseCard';

export default function LowerBody({ navigation }) {
    const [visibleSection, setVisibleSection] = useState(null);

    const toggleSection = (section) => {
        setVisibleSection(visibleSection === section ? null : section);
    };

    return (
        <ScrollView style={{flex: 1, backgroundColor: '#FFF2D7'}} contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => toggleSection('Quadriceps')}>
                <Text style={styles.subHeader}>Quadriceps</Text>
            </TouchableOpacity>
            {visibleSection === 'Quadriceps' && (
                <View style={styles.labels}>
                    <ExerciseCard
                        text={"Squats"}
                        gif={require("../../assets/Squats.gif")}
                        cal={0.5}  // Calorie per rep
                        time={2}   // Time per rep
                    />
                    <ExerciseCard
                        text={"Leg Press"}
                        gif={require("../../assets/Leg Press.gif")}
                        cal={0.6}  // Calorie per rep
                        time={2}   // Time per rep
                    />
                    <ExerciseCard
                        text={"Lunges"}
                        gif={require("../../assets/Lunges.gif")}
                        cal={0.4}  // Calorie per rep
                        time={2.5} // Time per rep
                    />
                    <ExerciseCard
                        text={"Step-Ups"}
                        gif={require("../../assets/Step-Ups.gif")}
                        cal={0.5}  // Calorie per rep
                        time={2}   // Time per rep
                    />
                </View>
            )}

            <TouchableOpacity onPress={() => toggleSection('Hamstrings')}>
                <Text style={styles.subHeader}>Hamstrings</Text>
            </TouchableOpacity>
            {visibleSection === 'Hamstrings' && (
                <View style={styles.labels}>
                    <ExerciseCard
                        text={"Romanian Deadlifts"}
                        gif={require("../../assets/Romanian Deadlifts.gif")}
                        cal={1}    // Calorie per rep
                        time={3}   // Time per rep
                    />
                    <ExerciseCard
                        text={"Hamstring Curls"}
                        gif={require("../../assets/Hamstring Curl.gif")}
                        cal={0.8}  // Calorie per rep
                        time={2}   // Time per rep
                    />
                    <ExerciseCard
                        text={"Glute-Ham Raises"}
                        gif={require("../../assets/Glute-Ham Raises.gif")}
                        cal={1}    // Calorie per rep
                        time={3}   // Time per rep
                    />
                </View>
            )}

            <TouchableOpacity onPress={() => toggleSection('Glutes')}>
                <Text style={styles.subHeader}>Glutes</Text>
            </TouchableOpacity>
            {visibleSection === 'Glutes' && (
                <View style={styles.labels}>
                    <ExerciseCard
                        text={"Hip Thrusts"}
                        gif={require("../../assets/Hip Thrusts.gif")}
                        cal={1}    // Calorie per rep
                        time={2.5} // Time per rep
                    />
                    <ExerciseCard
                        text={"Cable Kickbacks"}
                        gif={require("../../assets/Cable Kickbacks.gif")}
                        cal={0.5}  // Calorie per rep
                        time={2}   // Time per rep
                    />
                    <ExerciseCard
                        text={"Donkey Kicks"}
                        gif={require("../../assets/Donkey Kicks.gif")}
                        cal={0.5}  // Calorie per rep
                        time={2}   // Time per rep
                    />
                </View>
            )}

            <TouchableOpacity onPress={() => toggleSection('Calves')}>
                <Text style={styles.subHeader}>Calves</Text>
            </TouchableOpacity>
            {visibleSection === 'Calves' && (
                <View style={styles.labels}>
                    <ExerciseCard
                        text={"Calf Raises"}
                        gif={require("../../assets/Calf Raises.gif")}
                        cal={0.3}  // Calorie per rep
                        time={1.5} // Time per rep
                    />
                    <ExerciseCard
                        text={"Seated Calf Raises"}
                        gif={require("../../assets/Seated Calf Raises.gif")}
                        cal={0.3}  // Calorie per rep
                        time={1.5} // Time per rep
                    />
                    <ExerciseCard
                        text={"Box Jumps"}
                        gif={require("../../assets/Box Jumps.gif")}
                        cal={0.5}  // Calorie per rep
                        time={2.5} // Time per rep
                    />
                    <ExerciseCard
                        text={"Jump Rope"}
                        gif={require("../../assets/Jump Rope.gif")}
                        cal={0.1}  // Calorie per rep (per jump)
                        time={0.5} // Time per rep (per jump)
                    />
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: '#FFF2D7',
    },
    labels: {
        paddingHorizontal: 10,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: "600",
        marginVertical: 5,
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: "#F8F4E1",
        borderRadius: 5,
        elevation: 3,
        color: "black",
        textAlign: 'center'
    },
});
