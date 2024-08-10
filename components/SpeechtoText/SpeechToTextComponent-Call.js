import { GoogleGenerativeAI } from '@google/generative-ai'
import * as FileSystem from 'expo-file-system'


export default async function SpeechToTextComponentCall(recording) {
    const GeminiAPI = new GoogleGenerativeAI("GOOGLE_GENERATIVE_AI_API_KEY");
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