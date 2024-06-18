import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/GymScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen'
import LeaderBoardScreen from './screens/LeaderBoardScreen';
import DietScreen from './screens/DietScreen';
import ExerciseScreen from './screens/ExerciseScreen';
import FullBody from './screens/FullBody';
import UpperBody from './screens/UpperBody';
import CoreBody from './screens/CoreBody';
import LowerBody from './screens/LowerBody';

import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';



import { withDecay } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const homeName = 'Home';
const gymName = 'Gym';
const profileName = 'Profile';
const leaderBoardName = 'Leader Board';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const height = 178 
const weight = 93
function MainTabs() {
  const screenOptions = {
    tabBarStyle:{
      width: '90%',
      alignSelf: 'center',
      backgroundColor:'#0000ff',
    },
    tabBarItemStyle:{
      borderRadius:10,
    }
  };
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconname;
          let rn = route.name;

          if (rn == homeName) {
            iconname = focused ? 'home' : 'home-outline';
            size = focused ? 28 : 20;
          } else if (rn == gymName) {
            iconname = focused ? 'leaf' : 'leaf-outline';
            size = focused ? 28 : 20;
          } else if (rn == profileName) {
            iconname = focused ? 'person' : 'person-outline';
            size = focused ? 28 : 20;
          } else if (rn == leaderBoardName) {
            iconname = focused ? 'list' : 'list-outline';
            size = focused ? 28 : 20;
          }
          return <Ionicons name={iconname} size={size} color={'#543310'} />;
        },
        tabBarStyle:{
          width: '108%',
          alignSelf: 'center',
          backgroundColor:'#FFF2D7',
          borderWidth: 0,
          height: 60,
        },
        tabBarItemStyle:{
          borderRadius:10,
          color: 'black',
          height: 60
        },
        headerStyle:{
          backgroundColor: '#fff',
        },
        headerTintColor: 'black'
      })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} options={{ tabBarLabel: '' , headerShown: false}} />
      <Tab.Screen name={gymName} component={SettingScreen} options={{ tabBarLabel: '' , headerShown: false}} />
      <Tab.Screen name={leaderBoardName} component={LeaderBoardScreen} options={{ tabBarLabel: '' , headerShown: false}} />
      <Tab.Screen name={profileName} component={ProfileScreen} options={{ tabBarLabel: '' , headerShown: false}} />
    </Tab.Navigator>
  );
}

export default function MainContainer() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#FFF2D7'}}>
    <NavigationContainer>
      <Stack.Navigator>
        {/* MainTabs is now the main entry point */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sign In" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />

        {/* Add SearchScreen as a hidden screen */}
        <Stack.Screen name='Search' component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Diet' component={DietScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Exercise' component={ExerciseScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Fullbody' component={FullBody} options={{ headerShown: false }} />
        <Stack.Screen name='Upperbody' component={UpperBody} options={{ headerShown: false }} />
        <Stack.Screen name='Corebody' component={CoreBody} options={{ headerShown: false }} />
        <Stack.Screen name='Lowerbody' component={LowerBody} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}


