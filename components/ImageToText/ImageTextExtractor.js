import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';

const ImageTextExtractor = ({ onTextExtracted }) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please grant permission to access the image library.');
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      extractText(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      extractText(result.assets[0].uri);
    }
  };

  const extractText = async (uri) => {
    if (!uri) {
      Alert.alert('No image selected', 'Please select an image first.');
      return;
    }

    const apiKey = "AIzaSyD03FIb588Cflel_qNLuk5teh8C7zfQygs"; 
    const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    try {
      const base64ImageData = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await axios.post(apiUrl, {
        requests: [
          {
            image: { content: base64ImageData },
            features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
          },
        ],
      });

      const extractedText = response.data.responses[0].fullTextAnnotation.text;
      const textToSend = `translate the below:\n${extractedText}`;

      if (onTextExtracted) {
        onTextExtracted(textToSend); 
      }
    } catch (error) {
      Alert.alert('Error', 'Error extracting text. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image source={require('./images/gallery.png')} style={styles.buttonImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={takePicture}>
        <Image source={require('./images/camera.png')} style={styles.buttonImage} />
      </TouchableOpacity>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
  },
  buttonImage: {
    width: 35,
    height: 35,
    margin: 5,
  },

});

export default ImageTextExtractor;
