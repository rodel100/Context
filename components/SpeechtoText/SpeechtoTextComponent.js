import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';
import SpeechtoTextComponentCall from './SpeechToTextComponent-Call';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { changePrompt } from '../../Redux/PromptReducer';

export default function SpeechtoTextComponent() {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const dispatch = useDispatch();
  const value = useSelector((state) => state.prompt.value)

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }
  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    let speechtoText = await SpeechtoTextComponentCall(uri);
    Transcript = speechtoText;
    console.log(Transcript);
    await dispatch(changePrompt(Transcript));
    console.log(value)
  }

  return (
    <TouchableOpacity style={styles.button}
    onPress={isRecording ? stopRecording : startRecording}>
      <FontAwesome name="microphone" size={24} color="black" />
    </TouchableOpacity>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
