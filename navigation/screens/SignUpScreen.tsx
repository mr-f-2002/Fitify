import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Platform, Alert, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { GlobalContext } from '../../GlobalState';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import postSignUp from '../../api/postSignUp'; // Adjust the path as necessary

const auth = getAuth();

const SignUpScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    weight: '',
    height: '',
    error: ''
  });

  const { globalState, setGlobalState } = useContext(GlobalContext);

  function signOutHandler() {
    navigation.navigate('Welcome');
    setGlobalState((prevState: any) => ({
      ...prevState,
      isLoggedIn: true,
      user: credentials.name,
    }));
  }

  async function signUp() {
    if (credentials.email === '' || credentials.password === '') {
      setCredentials({
        ...credentials,
        error: 'Email and password are mandatory.'
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        Alert.alert('Verification email sent. Please verify your email before signing in.');
        
        // Post the user data to Firestore
        const userData = {
          Age: parseInt(credentials.age),
          Height: parseFloat(credentials.height),
          Weight: credentials.weight,
          name: credentials.name,
          user: credentials.email,
        };

        await postSignUp(userData);
      }
      navigation.navigate('MainTabs');
    } catch (error) {
      if (error instanceof Error) {
        setCredentials({
          ...credentials,
          error: error.message,
        });
      } else {
        setCredentials({
          ...credentials,
          error: 'An unknown error occurred.',
        });
      }
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} >
      <Text style={styles.title}>Sign up</Text>

      {/* <View style={styles.backButton}>
        <Ionicons name="arrow-back" size={25} color='#fff'/>
      </View> */}

      {!!credentials.error && <Text style={styles.error}>{credentials.error}</Text>}

      <Input
        placeholder='Name'
        containerStyle={styles.input}
        value={credentials.name}
        onChangeText={(text) => setCredentials({ ...credentials, name: text })}
        leftIcon={<Ionicons name="person" size={16} color='#543310'/>}
      />

      <Input
        placeholder='Age'
        containerStyle={styles.input}
        value={credentials.age}
        keyboardType='numeric'
        onChangeText={(text) => setCredentials({ ...credentials, age: text })}
        leftIcon={<Ionicons name="calendar" size={16} color='#543310'/>}
      />

      <Input
        placeholder='Height'
        containerStyle={styles.input}
        value={credentials.height}
        keyboardType='numeric'
        onChangeText={(text) => setCredentials({ ...credentials, height: text })}
        leftIcon={<Ionicons name="man" size={16} color='#543310'/>}
      />

      <Input
        placeholder='Weight'
        containerStyle={styles.input}
        value={credentials.weight}
        keyboardType='numeric'
        onChangeText={(text) => setCredentials({ ...credentials, weight: text })}
        leftIcon={<Ionicons name="speedometer" size={16} color='#543310'/>}
      />

      <Input
        placeholder='Email'
        containerStyle={styles.input}
        value={credentials.email}
        onChangeText={(text) => setCredentials({ ...credentials, email: text })}
        leftIcon={<Ionicons name="mail-open" size={16} color='#543310'/>}
      />

      <Input
        placeholder='Password'
        containerStyle={styles.input}
        value={credentials.password}
        onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        secureTextEntry={true}
        leftIcon={<Ionicons name="key" size={16} color='#543310'/>}
      />

<TouchableOpacity style={styles.button} onPress={signUp}>
      <Text style={styles.buttonText}>Sign up</Text>
    </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#FFF2D7'
  },
  title: {
    fontSize: 34,
    marginBottom: 20,
    color: "#543310",
  },
  input: {
    // marginTop: 0,
    width: '80%',
  },
  button: {
    marginTop: 20,
    width: '80%',
    backgroundColor: "#B5C18E",
    textAlign: 'center',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
    width: '80%',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    borderRadius: 50,
    padding: 5,
    borderColor: "black",
    backgroundColor: '#543310',
  }
});

export default SignUpScreen;
