import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';

const WelcomeScreen = ({ navigation }: StackScreenProps<any>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <View style={styles.buttons}>
      <TouchableOpacity
        style={[styles.button, styles.signInButton]}
        onPress={() => navigation.navigate('Sign In')}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.signUpButton]}
        onPress={() => navigation.navigate('Sign Up')}
      >
        <Text style={styles.signUpButtonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#FFF2D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    color: "#543310",
  },
  buttons: {
    marginTop: 60,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
  },
  signInButton: {
    backgroundColor: '#B5C18E',
  },
  signUpButton: {
    borderWidth: 1,
    borderColor: '#543310',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  signUpButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default WelcomeScreen;
