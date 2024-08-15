import { GoogleGenerativeAI } from '@google/generative-ai'
import * as FileSystem from 'expo-file-system'
import { useSelector, useDispatch } from 'react-redux'
import { changePrompt } from '../../Redux/PromptReducer'


export default async function SpeechToTextComponentCall(recording) {
    const GeminiAPI = new GoogleGenerativeAI("AIzaSyD03FIb588Cflel_qNLuk5teh8C7zfQygs");
    const model = GeminiAPI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });
    const audioFile = await FileSystem.readAsStringAsync(recording, {
        encoding: FileSystem.EncodingType.Base64,
    });
    try {
        const result = await model.generateContent(["Transcribe this audio", { inlineData: { data: audioFile, mimeType: "audio/m4a" } }]);
        transcription = result.response.text()
        return transcription
    } catch (error) {
        console.error(error)
    }
}