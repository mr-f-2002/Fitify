import React, { useState , useContext} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform , Alert, TouchableOpacity} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { GlobalContext } from '../../GlobalState';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const auth = getAuth();

const SignInScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    error: ''
  });

  const { globalState, setGlobalState } = useContext(GlobalContext);

    function signInHandler() {
        navigation.navigate('Welcome');
        //set global state to true
        setGlobalState((prevState:any) => ({
            ...prevState,
            isLoggedIn: true,
            user:credentials.email,
          }));

    }

  async function signIn() {
  if (credentials.email === '' || credentials.password === '') {
    setCredentials({
      ...credentials,
      error: 'Email and password are mandatory.'
    });
    return;
  }

  try {
    console.log("Trying to sign in...")
    await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    const user = auth.currentUser;
    if (user && user.emailVerified) {
      setGlobalState((prevState: any) => ({
        ...prevState,
        isLoggedIn: true,
        user: credentials.email,
      }));
      navigation.navigate('MainTabs');
    } else {
      Alert.alert('Please verify your email before signing in.');
      auth.signOut();  // Sign out the user if the email is not verified
    }
  } catch (error) {
    console.log("Error signing in: ", error);
    if (error instanceof Error) {
      console.log("Error message: ", error.message);
      setCredentials({
        ...credentials,
        error: error.message,
      });
    } else {
      console.log("An unknown error occurred.");
      setCredentials({
        ...credentials,
        error: 'An unknown error occurred.',
      });
    }
  }
}

  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        {/* <View style={styles.backButton}>
        <Icon name="arrow-left" size={30}  onPress={signInHandler}/>
        </View> */}
        
      <View style={styles.innerContainer}>
        
        <Text style={styles.title}>Sign in</Text>

        {!!credentials.error && <Text style={styles.error}>{credentials.error}</Text>}

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

<TouchableOpacity style={styles.button} onPress={signIn}>
      <Text style={styles.buttonText}>Sign in</Text>
    </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2D7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    marginBottom: 20,
    color: "#543310",
  },
  input: {
    marginTop: 10,
    width: '100%',
  },
  button: {
    marginTop: 20,
    width: '80%',
    backgroundColor: "#B5C18E",
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
    width: '100%',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    borderRadius: 50,
    padding: 5,
    borderColor:"black",
    
  }
});

export default SignInScreen;
