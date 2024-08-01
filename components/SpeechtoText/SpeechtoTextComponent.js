// Purpose: This file contains the code for the Speech to Text component. This component is used to convert speech to text.
//          This component is a child component of the Translation component.
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';


export default function SpeechtoTextComponent(){
startRecording = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  
    if (status !== 'granted') return;
  
    this.setState({ isRecording: true });
  
    await Audio.setAudioModeAsync({
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });
  
    const recording = new Audio.Recording();
  
    try {
      await recording.prepareToRecordAsync(recordingOptions);
  
      await recording.startAsync();
    } catch (error) {
      console.log(error);
      this.stopRecording();
    }
    this.recording = recording;
  }
}