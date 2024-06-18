import * as React from 'react'
import MainContainer from './navigation/MainContainer'
import {View, Text} from 'react-native'
import { GlobalProvider } from './GlobalState';

function App(){ 
  return(
    <GlobalProvider>
      <MainContainer/>
    </GlobalProvider>
  )
}

export default App;