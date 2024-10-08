import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Picker } from '@react-native-picker/picker';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  View,
  SafeAreaView,
} from 'react-native';
import * as Speech from 'expo-speech';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { changePrompt } from '../../Redux/PromptReducer'
import SpeechtoTextComponent from '../SpeechtoText/SpeechtoTextComponent';
import { useSelector, useDispatch } from 'react-redux'


const apiKey = "AIzaSyD03FIb588Cflel_qNLuk5teh8C7zfQygs";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction:
    "Imagine you are a friendly native language teacher having a conversation with a learner. Initiate the conversation in a simple, friendly manner, discussing everyday topics. Correct the learner's mistakes in spelling and grammar. I will specify the language you should respond in with my initial input, and you should only respond in that language.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 200,
  responseMimeType: 'text/plain',
};

const chat = model.startChat({
  history: [],
  generationConfig: generationConfig,
});

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState('');
  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Russian',
  ];
  const prompt = useSelector((state) => state.prompt.value)
  const dispatch = useDispatch();
  
  const createMessage = (text, user) => {
    const messageObj = {
      id: (messages.length + 1).toString(),
      username: user,
      message: text,
      languageName: language,
    };
    return messageObj;
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      const userMessage = createMessage(inputText, 'User');
      addMessage(userMessage);
      aiMessage(inputText);
      setInputText('');
    }
    else if(prompt.trim()){
      const userMessage = createMessage(prompt, 'User');
      addMessage(userMessage);
      aiMessage(prompt);
      setInputText('');
    }
  };

  const aiMessage = async (input) => {
    const result = await chat.sendMessage(input);
    const response = await result.response;
    const text = response.text();
    const message = createMessage(text, 'AI');
    //const updatedAiMessage = [...messages, message]
    addMessage(message);
  };

  const addMessage = (newMsg) => {
    setMessages((msg) => [...msg, newMsg]);
  };

  useEffect(() => {
    const beginChat = async () => {
      setMessages([]);
      const result = await model.generateContent(language);
      const response = await result.response;
      const text = response.text();
      const initialMessage = createMessage(text, 'AI');
      setMessages([initialMessage]);
    };
    beginChat();
  }, [language]);

  const renderMessage = ({ item }) => {
    return (
      <View>
        <Text><Text style={styles.messageText}>{item.username}:</Text></Text>
        <Text style={styles.messageText}>{item.message}</Text>
        {item.username === "AI" ? (
        <TouchableOpacity onPress={() => Speech.speak(item.message.toString())}>
        <FontAwesome name="volume-up" size={24} color="white" />
        </TouchableOpacity> ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Picker
          style={styles.picker}
          itemStyle={{ backgroundColor: 'black' }}
          selectedValue={language}
          onValueChange={(lang) => setLanguage(lang)}>
          {languages.map((lang) => {
            return <Picker.Item key={lang} label={lang} value={lang} />;
          })}
        </Picker>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message"
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <FontAwesome name="send" size={24} color="black" />
        </TouchableOpacity>
        <SpeechtoTextComponent onSendMessage={sendMessage}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  textInput: {
    height: 40,
    borderColor: '#ff6347',
    borderWidth: 2,
    width: '80%',
    paddingHorizontal: 0,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Cochin',
    color: '#DCDCDC',
    paddingTop: 7,
    textAlign: "Center",
    paddingLeft: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
  button: {
    backgroundColor: '#ff6347',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginRight: 2
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 3,
    borderTopWidth: 1,
    borderColor: '#ff6347',
    backgroundColor: '',
    textAlign: "Center"
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    borderColor: '#ff6347',
    color: '#DCDCDC',
    borderWidth: 2,
    fontFamily: 'Cochin',
  },
  chatContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageText: {
    color: '#DCDCDC',
  },
});

export default ChatScreen;
