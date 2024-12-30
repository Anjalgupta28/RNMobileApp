import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screen/Login/LoginScreen';
import TodoScreen from './src/screen/Todo/TodoScreen';
import { TodoProvider } from './src/screen/Todo/TodoContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TodoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Todo" component={TodoScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoProvider>
  );
}
