import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Countdown from './components/Countdown';
import Header from './components/Header';
import BibleVerse from './components/BibleVerse';

function App(): JSX.Element {
  return (
    <SafeAreaView
      style={{backgroundColor: 'lightpink', height: '100%', width: '100%'}}>
      <ScrollView
        style={{
          height: '90%',
          marginTop: '5%',
          marginBottom: '5%',
        }}>
        <Header />
        <Countdown date="03/19/2029" />
        <BibleVerse />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
