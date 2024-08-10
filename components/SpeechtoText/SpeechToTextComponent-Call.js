import { GoogleGenerativeAI } from '@google/generative-ai'
import * as FileSystem from 'expo-file-system'
import base64 from 'react-native-base64'


export default async function SpeechToTextComponentCall(recording) {
    const GeminiAPI = new GoogleGenerativeAI("AIzaSyC7fIwZtPuicLZu99zbOMcJGniiBIZFakk");
    const model = GeminiAPI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });
    const audioFile = await FileSystem.readAsStringAsync(recording, {
        encoding: FileSystem.EncodingType.Base64,
    });

    try {
        const result = await model.generateContent(["Transcribe this audio", { inlineData: { data: audioFile, mimeType: "audio/m4a" } }]);
        transcription = result.response.text()
        console.log(transcription)
        return transcription
    } catch (error) {
        console.error(error)
    }
}