import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MeteoComplete() {
  
    const [datas, setDatas] = useState({});

    useEffect(() => {
        ( async () =>{
            try{
                const weatherDatas = JSON.parse( await AsyncStorage.getItem('@weatherData'));
                if(!weatherDatas){
                    getWeatherData();
                }else{
                    setDatas(weatherDatas);
                }
            }catch(e){
                console.log('error', e);
            }
        })();
    }, []);

    const sortByDate = async (forecast) => {
        let sortedForecast = {};
        forecast.list.forEach((e) => {
            let date = new Date(e.dt * 1000).toLocaleDateString('fr').split(',')[0];
            if(!sortedForecast[date]){
                sortedForecast[date] = [e];
            }else{
                sortedForecast[date].push(e);
            }
        })

        await AsyncStorage.setItem('@weatherData', JSON.stringify(sortedForecast));
        return sortedForecast;
    }

    const getWeatherData = async () => {
        const fetchUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=nice&lang=fr&appid=cb9e5ac430a7343d9ec6c7ca4052acf7';
        try{
            const response = await fetch(fetchUrl, {
                method: 'GET'
            });
            const forecast = await response.json();
            setDatas(sortByDate(forecast));
        }catch(e){  
            console.log('error', e);
            return;
        }
    }

  
    const renderDatas = () => {
        //console.log('je suis la', datas);
        return Object.keys(datas).map((property, index) => (
                <View style={styles.container} key={index}>
                    <View style={styles.insideContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={[styles.bold, styles.title]}>{property}</Text>
                        </View>
                        {
                            datas[property].map((e, i, arr) => (
                                <View key={index + e.dt}>
                                    <View style={arr.length - 1 === i ? [styles.infosContainer, styles.noBorder] : styles.infosContainer}>
                                        <Image
                                            style={styles.tinyLogo}
                                            source={{
                                                uri: 'http://openweathermap.org/img/wn/'  + e.weather[0].icon + '@2x.png'
                                            }} 
                                        />
                                        <Text style={styles.description}>{e.weather[0].description}</Text>
                                        <Text style={[styles.description, styles.bold]}>{e.main.temp}°c</Text>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                </View>
            )
        )
    }   
    return (
        <View style={styles.container}>
            {renderDatas()}
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer:{
        marginBottom: 10
    },
    infosContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        width: 280
    },
    noBorder:{
        borderBottomWidth: 0
    },
    bold:{
        fontWeight: 'bold'
    },
    title:{
        color: 'black',
        fontSize: 15
    },  
    row:{
        flexDirection: 'row',
        flex: 1
    },
    container:{
      flex: 8,
      backgroundColor: '#3498db',
      alignItems: 'center'
    },
    dateTitle:{
        marginHorizontal: 20,
        fontSize: 14
    },  
    name:{
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 20
    },
    tinyLogo:{
        width: 30,
        height: 30,
        marginRight: 20
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
        margin: 10,
        flex: 1
    },
    border:{
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginVertical: 10,
        width: 280
    },
    description:{
        textAlign: 'center'
    },
    name:{
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
        marginBottom: 10
    }
});
