import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SettingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  backgroundColor: '#FFF2D7' }}>
      <Text style={styles.header}>Balance</Text>
      <Text style={styles.subheader}>between <Text style={styles.clrtext}>DIET</Text> and <Text style={styles.clrtext}>EXERCISE</Text></Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Diet')}
      >
        <Image source={require('../../assets/diet.jpg')} style={styles.icon} />
        {/* <Ionicons style={styles.logo} name="restaurant-outline" size={100} color='#fff'></Ionicons> */}
        <Text style={styles.logo}>Diet Plan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Exercise')}
      >
        <Image source={require('../../assets/exercise.png')} style={styles.icon} />
        {/* <Ionicons style={styles.logo} name="barbell-outline" size={100} color='#fff'></Ionicons> */}
        <Text style={styles.logo}>Exercise</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 25,
    backgroundColor: '#fff',
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    margin: 5,
    borderRadius: 15,
    alignItems: 'center', 
    width: '94%',
    marginVertical: 10,
  },
  icon: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  header:{
    fontSize: 56,
    fontWeight: 'bold',
  },
  subheader:{
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 40
  },
  clrtext:{
    color:'#543310',
    fontWeight: '800',
  },
  logo: {
    position: 'absolute',
    left: 10,
    top: 45,
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(153, 153, 153, 0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  }
});
