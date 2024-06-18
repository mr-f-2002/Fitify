import React, { useState, useEffect } from 'react';
import MainContainer from './navigation/MainContainer';
import { View, Image, StyleSheet } from 'react-native';
import { GlobalProvider } from './GlobalState';
import { LogBox } from 'react-native';

// Ignore all log notifications
LogBox.ignoreAllLogs();

// Or, to ignore specific logs
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message content


function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <GlobalProvider>
      <View style={{ flex: 1 }}>
        <MainContainer />
        {isSplashVisible && (
          <View style={styles.splashContainer}>
            <Image
              source={require('./assets/splash.png')} // Ensure you have the splash.png image in your assets folder
              style={styles.splashImage}
            />
          </View>
        )}
      </View>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Change to match your splash screen background color
  },
  splashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Adjust this based on your image aspect ratio
  },
});

export default App;
