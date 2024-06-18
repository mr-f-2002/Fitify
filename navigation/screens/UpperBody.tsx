import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ExerciseCard from '../../component/ExerciseCard';

export default function UpperBody({ navigation }) {
    const [visibleSection, setVisibleSection] = useState(null);
    const [visibleSubSection, setVisibleSubSection] = useState(null);

    const toggleSection = (section) => {
        setVisibleSection(visibleSection === section ? null : section);
        if (visibleSection !== section) {
            setVisibleSubSection(null); // Reset sub-section if the main section is toggled
        }
    };

    const toggleSubSection = (subSection) => {
        setVisibleSubSection(visibleSubSection === subSection ? null : subSection);
    };

    return (
        <ScrollView style={{flex: 1, backgroundColor: '#FFF2D7'}}  contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => toggleSection('Chest')}>
                <Text style={styles.subHeader}>Chest</Text>
            </TouchableOpacity>
            {visibleSection === 'Chest' && (
                <View style={styles.labels}>
                    <ExerciseCard
                        text={"Push-Ups"}
                        gif={require("../../assets/Push-Ups.gif")}
                        cal={0.5}  // Calorie per rep
                        time={1.5} // Time per rep
                    />
                    <ExerciseCard
                        text={"Bench Press"}
                        gif={require("../../assets/Bench Press.gif")}
                        cal={1.5}  // Calorie per rep
                        time={2}   // Time per rep
                    />
                    <ExerciseCard
                        text={"Chest Flyes"}
                        gif={require("../../assets/Chest Flyes.gif")}
                        cal={1}    // Calorie per rep
                        time={1.5} // Time per rep
                    />
                    <ExerciseCard
                        text={"Incline Press"}
                        gif={require("../../assets/Incline Press.gif")}
                        cal={1.2}  // Calorie per rep
                        time={2}   // Time per rep
                    />
                </View>
            )}

            <TouchableOpacity onPress={() => toggleSection('Back')}>
                <Text style={styles.subHeader}>Back</Text>
            </TouchableOpacity>
            {visibleSection === 'Back' && (
                <View style={styles.labels}>
                    <ExerciseCard
                        text={"Pull-Ups"}
                        gif={require("../../assets/Pull-Ups.gif")}
                        cal={1.2}  // Calorie per rep
                        time={2}   // Time per rep
                    />
                    <ExerciseCard
                        text={"Bent Over Rows"}
                        gif={require("../../assets/Bent Over Rows.gif")}
                        cal={1.5}  // Calorie per rep
                        time={1.8} // Time per rep
                    />
                    <ExerciseCard
                        text={"Lat Pulldowns"}
                        gif={require("../../assets/Lat Pulldowns.gif")}
                        cal={1}    // Calorie per rep
                        time={2}   // Time per rep
                    />
                    <ExerciseCard
                        text={"Deadlifts"}
                        gif={require("../../assets/Deadlifts.gif")}
                        cal={2}    // Calorie per rep
                        time={2}   // Time per rep
                    />
                </View>
            )}

            <TouchableOpacity onPress={() => toggleSection('Shoulders')}>
                <Text style={styles.subHeader}>Shoulders</Text>
            </TouchableOpacity>
            {visibleSection === 'Shoulders' && (
                <View style={styles.labels}>
                    <ExerciseCard
                        text={"Overhead Press"}
                        gif={require("../../assets/Overhead Press.gif")}
                        cal={1.2}  // Calorie per rep
                        time={2}   // Time per rep
                    />
                    <ExerciseCard
                        text={"Lateral Raises"}
                        gif={require("../../assets/Lateral Raises.gif")}
                        cal={0.8}  // Calorie per rep
                        time={1.5} // Time per rep
                    />
                    <ExerciseCard
                        text={"Front Raises"}
                        gif={require("../../assets/Front Raises.gif")}
                        cal={0.8}  // Calorie per rep
                        time={1.5} // Time per rep
                    />
                    <ExerciseCard
                        text={"Arnold Press"}
                        gif={require("../../assets/Arnold Press.gif")}
                        cal={1}    // Calorie per rep
                        time={2}   // Time per rep
                    />
                </View>
            )}

            <TouchableOpacity onPress={() => toggleSection('Arms')}>
                <Text style={styles.subHeader}>Arms</Text>
            </TouchableOpacity>
            {visibleSection === 'Arms' && (
                <>
                    <TouchableOpacity onPress={() => toggleSubSection('Biceps')}>
                        <Text style={styles.subHeaderSmall}>Biceps</Text>
                    </TouchableOpacity>
                    {visibleSubSection === 'Biceps' && (
                        <View style={styles.labels}>
                            <ExerciseCard
                                text={"Bicep Curls"}
                                gif={require("../../assets/Bicep Curls.gif")}
                                cal={0.8}  // Calorie per rep
                                time={1.5} // Time per rep
                            />
                            <ExerciseCard
                                text={"Hammer Curls"}
                                gif={require("../../assets/Hammer Curls.gif")}
                                cal={0.7}  // Calorie per rep
                                time={1.5} // Time per rep
                            />
                            <ExerciseCard
                                text={"Preacher Curls"}
                                gif={require("../../assets/Preacher Curls.gif")}
                                cal={0.9}  // Calorie per rep
                                time={2}   // Time per rep
                            />
                            <ExerciseCard
                                text={"Concentration Curls"}
                                gif={require("../../assets/Concentration Curls.gif")}
                                cal={0.8}  // Calorie per rep
                                time={2}   // Time per rep
                            />
                        </View>
                    )}
                    <TouchableOpacity onPress={() => toggleSubSection('Triceps')}>
                        <Text style={styles.subHeaderSmall}>Triceps</Text>
                    </TouchableOpacity>
                    {visibleSubSection === 'Triceps' && (
                        <View style={styles.labels}>
                            <ExerciseCard
                                text={"Tricep Dips"}
                                gif={require("../../assets/Tricep Dips.gif")}
                                cal={0.7}  // Calorie per rep
                                time={2}   // Time per rep
                            />
                            <ExerciseCard
                                text={"Tricep Pushdowns"}
                                gif={require("../../assets/Tricep Pushdowns.gif")}
                                cal={0.6}  // Calorie per rep
                                time={2}   // Time per rep
                            />
                            <ExerciseCard
                                text={"Overhead Tricep Extension"}
                                gif={require("../../assets/Overhead Tricep Extension.gif")}
                                cal={0.8}  // Calorie per rep
                                time={2}   // Time per rep
                            />
                            <ExerciseCard
                                text={"Skull Crushers"}
                                gif={require("../../assets/Skull Crushers.gif")}
                                cal={0.8}  // Calorie per rep
                                time={1.5} // Time per rep
                            />
                        </View>
                    )}
                </>
            )}
        </ScrollView>
    );
}
                            
                               


const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: '#FFF2D7',
        // flex: 1
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
    subHeaderSmall: {
        fontSize: 18,
        fontWeight: "500",
        marginVertical: 5,
        marginHorizontal: 10,
        paddingVertical: 5,
        paddingHorizontal: 35,
        backgroundColor: "#fff",
        borderRadius: 5,
        elevation: 2,
        color: "black",
        marginLeft: 10,
        textAlign: 'center'
    },
});
