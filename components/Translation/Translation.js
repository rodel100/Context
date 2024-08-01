import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Translation() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');

  const languages = [
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
  ];

  const translateText = async () => {
    try {
      const response = await axios.post(
        'https://gemini-api-url/v1/text:translate',
        {
          input: text,
          targetLanguage: targetLanguage,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer APIKEY`,
          },
        }
      );
      setTranslatedText(response.data.translations[0].translatedText);
    } catch (error) {
      console.error(error);
      setTranslatedText('Error translating text');
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
    marginTop: 20,
    fontSize: 18,
    fontStyle: 'italic',
    color: '#ff6347',
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
});
