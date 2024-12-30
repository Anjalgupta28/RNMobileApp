import React from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';
import { TodoItemType } from '../../res/strings/strings';

export default function TodoItem({ item, onDelete, onComplete, onEdit }) {
  const {complete, edit, dltButton} = TodoItemType
  return (
    <Animated.View
      style={[
        styles.container,
        item.completed && styles.completed,
        { opacity: item.animation },
      ]}
    >
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
        {item.dueDate ? <Text style={styles.dueDate}>Due: {item.dueDate}</Text> : null}
      </View>
      <View style={styles.buttons}>
        <Button title={complete} color="green" onPress={onComplete} />
        <Button title={edit} onPress={() => onEdit(item)} />
        <Button title={dltButton} color="red" onPress={onDelete} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  completed: {
    backgroundColor: '#d4fcd4',
  },
  info: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  dueDate: {
    fontSize: 12,
    color: '#999',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
