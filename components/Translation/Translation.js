import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View } from 'react-native';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'GOOGLE_GENERATIVE_AI_API_KEY';

const genAI = new GoogleGenerativeAI("AIzaSyC7fIwZtPuicLZu99zbOMcJGniiBIZFakk");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "Translate the following text to the specified language.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 200,
  responseMimeType: "text/plain",
};

const chat = model.startChat({
  history: [],
  generationConfig: generationConfig,
});

export default function App() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');

  const languages = [
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Chinese (Simplified)', value: 'zh-CN' },
    { label: 'Chinese (Traditional)', value: 'zh-TW' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Korean', value: 'ko' },
    { label: 'Italian', value: 'it' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
    { label: 'Arabic', value: 'ar' },
    { label: 'Dutch', value: 'nl' },
    { label: 'Swedish', value: 'sv' },
    { label: 'Turkish', value: 'tr' },
    { label: 'Danish', value: 'da' },
    { label: 'Norwegian', value: 'no' },
    { label: 'Finnish', value: 'fi' },
    { label: 'Polish', value: 'pl' },
    { label: 'Hungarian', value: 'hu' },
    { label: 'Czech', value: 'cs' },
    { label: 'Greek', value: 'el' },
    { label: 'Hebrew', value: 'he' },
    { label: 'Thai', value: 'th' },
    { label: 'Vietnamese', value: 'vi' },
    { label: 'Indonesian', value: 'id' },
    { label: 'Malay', value: 'ms' },
    { label: 'Filipino', value: 'tl' },
    { label: 'Romanian', value: 'ro' },
    { label: 'Ukrainian', value: 'uk' },
    { label: 'Bulgarian', value: 'bg' },
    { label: 'Slovak', value: 'sk' },
    { label: 'Croatian', value: 'hr' },
    { label: 'Serbian', value: 'sr' },
    { label: 'Lithuanian', value: 'lt' },
    { label: 'Latvian', value: 'lv' },
    { label: 'Estonian', value: 'et' },
    { label: 'Swahili', value: 'sw' },
    { label: 'Malayalam', value: 'ml' },
    { label: 'Bengali', value: 'bn' },
    { label: 'Gujarati', value: 'gu' },
    { label: 'Marathi', value: 'mr' },
    { label: 'Punjabi', value: 'pa' },
    { label: 'Tamil', value: 'ta' },
    { label: 'Telugu', value: 'te' },
    { label: 'Urdu', value: 'ur' }
];
 const translateText = async () => {
    try {
      const input = `Translate this to ${targetLanguage}: ${text}`;
      const result = await chat.sendMessage(input);
      const response = await result.response.text();
      setTranslatedText(response);
    } catch (error) {
      console.error("Translation error: ", error);
      setTranslatedText("An error occurred while translating. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Translate</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter text to translate"
        onChangeText={setText}
        value={text}
      />
      <Picker
        selectedValue={targetLanguage}
        style={styles.picker}
        onValueChange={(itemValue) => setTargetLanguage(itemValue)}>
        {languages.map((lang) => (
          <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.button} onPress={translateText}>
        <Text style={styles.buttonText}>Translate</Text>
      </TouchableOpacity>
      <Text style={styles.translatedText}>{translatedText}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: 20,
    fontFamily: 'Cochin',
  },
  textInput: {
    height: 40,
    borderColor: '#ff6347',
    borderWidth: 2,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Cochin',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: '#ff6347',
    borderWidth: 2,
    overflow: 'hidden',
    fontFamily: 'Cochin',
  },
  button: {
    backgroundColor: '#ff6347',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
  translatedText: {
    height: 100,
    borderColor: '#ff6347',
    borderWidth: 2,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Cochin',
  },
});