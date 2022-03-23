import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import Meteo from './components/Meteo';
import Header from './components/Header';
import Footer from './components/Footer';
import MeteoComplete from './components/MeteoComplete';

export default function App() {

  const [refresh, setRefresh] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <ScrollView>
        <MeteoComplete />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },
  header:{
    flex: 1
  },
  footer:{
    flex: 1
  },
  body:{
    flex: 1
  }
});
