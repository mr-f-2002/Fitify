import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Accelerometer } from 'expo-sensors';
import { LineChart } from "react-native-chart-kit";
import { GlobalContext } from '../../GlobalState';
import { fetchLast7DaysData, fetchLast30DaysData } from '../../api/lineChartData';
// import "../api/ranking.ts"

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen({ navigation }) {
  const [data, setData] = React.useState({
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri',],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 55, 65],
        color: (opacity = 1) => `#543310`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Today"] // optional
  });

  const chartConfig = {
    backgroundGradientFrom: "#F8F4E1",
    backgroundGradientFromOpacity: 0.1,
    backgroundGradientTo: "#AF8F6F",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `#000000`,
    strokeWidth: 20, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    elevation: 5,
  };

  const handlePress = async ({ period }) => {
    let fetchedData = [];

    // if (period === 'day') {
    //   fetchedData = await fetchLast7DaysData(globalState.user);
    // } else
    //  
    if (period === 'week') {
      fetchedData = await fetchLast7DaysData(globalState.user);
    } else if (period === 'month') {
      fetchedData = await fetchLast30DaysData(globalState.user);
    }

    if (fetchedData.length > 0) {
      setData({
        // labels: period === 'month' ? Array.from({ length: 30 }, (_, i) => (i + 1).toString()) : ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
          {
            data: fetchedData,
            color: (opacity = 1) => `#74512D`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: [`This ${period.charAt(0).toUpperCase() + period.slice(1)}`] // optional
      });
    }
  };

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const bmi = globalState.weight / (globalState.height ** 2);
  const [modalVisible, setModalVisible] = useState(false);
  const [stepsCount, setStepsCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isCounting) {
      startCountingSteps();
      startStopwatch();
    } else {
      stopCountingSteps();
      clearInterval(intervalRef.current);
    }

    return () => {
      stopCountingSteps(); // Clean up subscription when component unmounts
      clearInterval(intervalRef.current);
    };
  }, [isCounting]);

  const startCountingSteps = async () => {
    const { isAvailable } = await Accelerometer.isAvailableAsync();

    if (isAvailable) {
      const newSubscription = Accelerometer.addListener(({ x, y, z }) => {
        // Basic step counting logic (this is just a placeholder)
        const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
        if (acceleration > 1.2) {
          setStepsCount(prevCount => prevCount + 1);
        }
      });
      // Save the subscription to remove later
      setSubscription(newSubscription);
    } else {
      console.log("Accelerometer is not available");
    }
  };

  const stopCountingSteps = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  const toggleCounting = () => {
    setIsCounting(prevState => !prevState);
  };

  const startStopwatch = () => {
    let startTime = Date.now() - elapsedTime;
    intervalRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);
  };

  const pauseStopwatch = () => {
    clearInterval(intervalRef.current);
  };

  const resetStopwatch = () => {
    setElapsedTime(0);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setIsCounting(false);
    setStepsCount(0);
    resetStopwatch();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFF2D7'}}>
      <Text style={[styles.header, { marginLeft: 12, marginTop: 20 }]}>Dashboard</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>

        <View style={[styles.box, { width: '28%', margin: '1%', height: 100, backgroundColor: '#543310' }]}>
          <Text style={styles.bodyTxt}>BMI</Text>
          <Text style={styles.headerW}>{bmi.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={[styles.box, { width: '65%', height: 110, margin: '1%', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#74512D' }]}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="footsteps-outline" size={40} color='#6fff00'></Ionicons>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.bodyTxt}>Steps taken today</Text>
            <Text style={styles.headerW}>{globalState.steps} steps</Text>
          </View>
        </TouchableOpacity>

      </View>
      <Text style={[styles.header, { marginLeft: 12, marginTop: 20 }]}>Today Activity</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>

        <View style={[styles.box, { width: '45%', margin: '1%', backgroundColor: '#F8F4E1' }]}>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
            <Ionicons name="analytics" size={40} color='#CC9544'></Ionicons>
            <Text><Text style={styles.header}>{globalState.walk}</Text> min</Text>
          </View>
          <Text style={styles.bodyTxtDark}>Walking</Text>
        </View>

        <View style={[styles.box, { width: '45%', margin: '1%', backgroundColor: '#F8F4E1' }]}>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
            <Ionicons name="barbell" size={40} color='#7882A4'></Ionicons>
            <Text><Text style={styles.header}>{globalState.exercise}</Text> min</Text>
          </View>
          <Text style={styles.bodyTxtDark}>Exercise</Text>
        </View>

      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>

        <View style={[styles.box, { width: '45%', margin: '1%', backgroundColor: '#F8F4E1' }]}>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
            <Ionicons name="ice-cream" size={40} color='#5F6F52'></Ionicons>
            <Text><Text style={styles.header}>{globalState.calorieIn}</Text> cal</Text>
          </View>
          <Text style={styles.bodyTxtDark}>Calorie Intake</Text>
        </View>

        <View style={[styles.box, { width: '45%', margin: '1%', backgroundColor: '#F8F4E1' }]}>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
            <Ionicons name="flame" size={40} color='#F2613F'></Ionicons>
            <Text><Text style={styles.header}>{globalState.calorieOut}</Text> cal</Text>
          </View>
          <Text style={styles.bodyTxtDark}>Calorie Burnt</Text>
        </View>
      </View>

      <Text style={[styles.header, { marginLeft: 12, marginTop: 20 }]}>Calorie Tracker</Text>
      <View style={{ borderRadius: 10, overflow: 'hidden', margin: '2%' }}>
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      </View>
      <View style={styles.tabHolder}>
        {/* <TouchableOpacity style={styles.tabs} onPress={() => handlePress({ day: 'day' })}><Text style={styles.bodyTxt}>Day</Text></TouchableOpacity>
        <View style={{ width: 2, height: 20, backgroundColor: '#543310' }}></View> */}
        <TouchableOpacity style={styles.tabs} onPress={() => handlePress({ period: 'week' })}><Text style={styles.bodyTxt}>Week</Text></TouchableOpacity>
        <View style={{
          width: 2, height: 20, backgroundColor: '#543310'
        }}></View>
        <TouchableOpacity style={styles.tabs} onPress={() => handlePress({ period: 'month' })}><Text style={styles.bodyTxt}>Month</Text></TouchableOpacity>
      </View>



      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Search')}>
        <Ionicons name="add-outline" size={30} color='white'></Ionicons>
      </TouchableOpacity>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Steps Counter</Text>
            <Text style={styles.stepsCount}>{stepsCount}</Text>
            <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
            <TouchableOpacity style={styles.startStopButton} onPress={toggleCounting}>
              <Text style={styles.buttonText}>{isCounting ? 'Pause' : 'Start'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const formatTime = (time) => {
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 1000 / 60) % 60;
  const hours = Math.floor(time / 1000 / 60 / 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  button: {
    elevation: 5,
    backgroundColor: '#543310',
    padding: 10,
    borderRadius: 50,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  headerW:{
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  bodyTxt: {
    color: '#fff',
    fontSize: 18
  },
  bodyTxtDark: {
    color: '#5c5c5c',
    fontSize: 18
  },
  graph: {
    width: 300,
    height: 200,
  },
  tabHolder: {
    width: '55%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#AF8F6F',
    padding: 5,
    borderRadius: 15, 
    marginBottom: 30 
  },
  tabs: {
    paddingHorizontal: 5,
    width: 60,
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: '#fffcf0',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: 'flex',
    alignItems: 'center'
  },
  modalText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  stepsCount: {
    fontSize: 46,
    marginBottom: 30,
    borderRadius: 100,
    elevation: 5,
    backgroundColor: '#F8F4E1',
    width: 120,
    height: 120,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  timer: {
    fontSize: 20,
    marginBottom: 80,
    backgroundColor: '#F8F4E1',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  startStopButton: {
    backgroundColor: '#B5C18E',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%'
  },
  closeButton: {
    backgroundColor: '#B99470',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
});
