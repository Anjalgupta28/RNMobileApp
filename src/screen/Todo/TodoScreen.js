import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Button, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native';
import TodoInput from '../../components/Inputs/TodoInput';
import TodoItem from '../../components/Items/TodoItem';
import { TodoContext } from './TodoContext';

export default function TodoScreen({ navigation }) {
  const { todos, setTodos, logout } = useContext(TodoContext);
  const [showInput, setShowInput] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSaveTodo = (updatedTodo) => {
    if (editingTodo) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, ...updatedTodo } : todo
      );
      setTodos(updatedTodos);
    } else {
      setTodos([...todos, updatedTodo]);
    }
    setShowInput(false);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setShowInput(true);
  };

  const handleCompleteTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>Hello</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Image
            source={require('../../res/images/ic_logout.png')}
            style={styles.logoutIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Add Todo" onPress={() => setShowInput(true)} />
      </View>
      {showInput && (
        <TodoInput
          onClose={() => {
            setShowInput(false);
            setEditingTodo(null);
          }}
          onSave={handleSaveTodo}
          initialData={editingTodo}
        />
      )}

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onDelete={() => handleDeleteTodo(item.id)}
            onComplete={() => handleCompleteTodo(item.id)}
            onEdit={handleEdit}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#e7c097",
    marginBottom: 20,
    height: 50
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  buttonContainer:{
    padding:20
  }
});
