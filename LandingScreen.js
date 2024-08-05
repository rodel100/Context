import React, { useRef, useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Animated,
} from 'react-native';

import Book from './assets/magicbook.jpg';

export default function Landing() {
  const phrase = 'This app is so much fun!!';
  
  const translations = [
    'Esta aplicación es muy divertida!!',
    'Cette application est tellement amusante!!',
    'Diese App macht so viel Spaß!!',
    "Quest'app est così divertente!!",
    'Este aplicativo é muito divertido!!',
    '这个应用程序非常有趣。!!',
    'このアプリはとても楽しいです。!!',
    '이 앱은 정말 재미있어요.!!',
    'Это приложение очень веселое!!',
    'هذا التطبيق ممتع للغاية!!',
    'यह ऐप बहुत मजेदार है।!!',
    'এই অ্যাপটি খুব মজার।!!',
    'یہ ایپ بہت مزے دار ہے!!',
    'Bu uygulama çok eğlenceli!!',
    'Den här appen är så mycket rolig!!',
    'Deze app is zoveel plezier!!',
    'Ta aplikacja jest bardzo zabawna!!',
    'แอพนี้สนุกมาก!!',
    'Ứng dụng này thật vui vẻ!!',
  ];

  const locYValue1 = useRef(new Animated.Value(0)).current;
  const locYValue2 = useRef(new Animated.Value(-300)).current;

  const getRandomTranslation = () => {
    const randomIndex = Math.floor(Math.random() * translations.length);
    return translations[randomIndex];
  };

  const MoveUp = () => {
    Animated.spring(locYValue1, {
      toValue: -300,
      damping: 300,
      stiffness: 1,
      useNativeDriver: true,
    }).start();
  };

  const MoveDown = () => {
    Animated.sequence([
      Animated.delay(500),
      Animated.spring(locYValue2, {
        toValue: -70,
        damping: 300,
        stiffness: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const Wait = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };  

  useEffect(() => {
    const fetchData = async () => {
      await Wait();
      MoveUp();
      MoveDown();
    };
  
    fetchData();
  }, []);
  

  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => (prevCount < 5 ? prevCount + 1 : prevCount));
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  const progress = (count / 5) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Language Hub </Text>
      <Text style={styles.text}>The only language app you'll ever need!</Text>
      <View style={styles.row}>
        <Image source={Book} style={styles.image} />
        <Animated.View
          style={[
            styles.textContainer1,
            { transform: [{ translateY: locYValue1 }] },
          ]}>
          <Text style={styles.text}>{phrase}</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.textContainer2,
            { transform: [{ translateY: locYValue2 }] },
          ]}>
          <Text style={styles.text}>{getRandomTranslation()}</Text>
        </Animated.View>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#FF6347', // # Team Color
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
    borderRadius: 10,
    zIndex: 1,
  },
  textContainer1: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
  textContainer2: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: 200,
  },
  text: {
    fontSize: 16,
    color: '#FF6347',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '80%',
    height: 20,
    backgroundColor: '#e0e0df',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF6347',
  },
});
