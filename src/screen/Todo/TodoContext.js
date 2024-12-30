import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      const storedTodos = await AsyncStorage.getItem('todos');
      
      if (username && password){
        setUsername(username);
        setUserLoggedIn(true);
      } 
      if (storedTodos){
        setTodos(JSON.parse(storedTodos));
      } 
    };
    fetchData();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('password');
    setUserLoggedIn(false);
    setUsername('');
  };

  const saveTodos = async (updatedTodos) => {
    setTodos(updatedTodos);
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <TodoContext.Provider value={{ todos, setTodos: saveTodos, userLoggedIn, setUserLoggedIn, logout, username}}>
      {children}
    </TodoContext.Provider>
  );
};
