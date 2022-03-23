import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Meteo() {
  
  const [datas, setDatas] = useState({});
  
  useEffect(() => {
    getWeatherData();
  }, []);

  const getWeatherData = async () => {
    const fetchUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=brest&lang=fr&appid=cb9e5ac430a7343d9ec6c7ca4052acf7';
    try{
      const response = await fetch(fetchUrl, {
        method: 'GET'
      });
      const data = await response.json();
      setDatas(data);
    }catch(e){  
      console.log('error', e);
      return;
    }
  }
  
  return (
    <View style={styles.container}>
        <View style={styles.insideContainer}>
            <Text style={[styles.name]}>{datas.name}</Text>
            <View style={styles.iconConatiner}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                    uri: `http://openweathermap.org/img/wn/${datas.weather?.[0]?.icon}@2x.png`,
                    }}
                />
                </View>
                <View style={styles.infos}>
                <Text style={[styles.infosReleve, styles.temp]}>{datas.main?.temp}°</Text>
                <Text style={[styles.infosReleve, styles.vitesse]}>{datas.wind?.speed}<Text style={styles.km}>km/h</Text></Text>
                </View>
                <View>
                <View style={styles.border}></View>
                <Text style={styles.description}>{datas.weather?.[0]?.description}</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      flex: 8,
      backgroundColor: '#3498db',
      alignItems: 'center'
    },
    name:{
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
    tinyLogo:{
        width: 80,
        height: 80
    },
    infos:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infosReleve:{
        marginHorizontal: 20,
        fontSize: 24,
        fontWeight: 'bold'
    },
    km:{
        fontSize: 12
    },
    insideContainer:{
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    border:{
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        margin: 20,
        width: 200
    },
    description:{
        textAlign: 'center'
    }
});
