import { GoogleGenerativeAI } from '@google/generative-ai'
import * as FileSystem from 'expo-file-system'
import { useSelector, useDispatch } from 'react-redux'
import { changePrompt } from '../../Redux/PromptReducer'


export default async function SpeechToTextComponentCall(recording) {
    const GeminiAPI = new GoogleGenerativeAI("");
    const model = GeminiAPI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });
    const audioFile = await FileSystem.readAsStringAsync(recording, {
        encoding: FileSystem.EncodingType.Base64,
    });
    const dispatch = useDispatch()

    try {
        const result = await model.generateContent(["Transcribe this audio", { inlineData: { data: audioFile, mimeType: "audio/m4a" } }]);
        transcription = result.response.text()
        console.log(transcription)
        dispatch(changePrompt(transcription))
    } catch (error) {
        console.error(error)
    }
}