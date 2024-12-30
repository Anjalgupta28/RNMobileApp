import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { TodoContext } from '../Todo/TodoContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginType } from '../../res/strings/strings';

export default function LoginScreen({ navigation }) {
  const { setUserLoggedIn } = useContext(TodoContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {userName, passwordText, todo, error, usernamepassReq, login, userPlaceholder, passPlaceholder} = LoginType
  useEffect(() => {
    const checkSavedCredentials = async () => {
      const savedUsername = await AsyncStorage.getItem(userName);
      const savedPassword = await AsyncStorage.getItem(passwordText);
      if (savedUsername && savedPassword) {
        setUsername(savedUsername);
        setPassword(savedPassword);
        handleLogin(true);
      }
    };
    checkSavedCredentials();
  }, []);

  const handleLogin = async (autoLogin = false) => {
    if (autoLogin || (username.trim() && password.trim())) {
      await AsyncStorage.setItem(userName, username);
      await AsyncStorage.setItem(passwordText, password);
      setUserLoggedIn(true);
      navigation.replace(todo);
    } else {
      Alert.alert(error, usernamepassReq);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{login}</Text>
      <TextInput
        style={styles.input}
        placeholder={userPlaceholder}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder={passPlaceholder}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={login} onPress={() => handleLogin()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
});
