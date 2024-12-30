import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TodoInputType } from '../../res/strings/strings';

export default function TodoInput({ onSave, onClose, initialData }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(
    initialData?.dueDate ? new Date(initialData.dueDate) : new Date()
  );
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const {titlePlaceholder, descriptionText, save, cancel, dueDateText} = TodoInputType
  const handleSave = () => {
    if (title.trim()) {
      onSave({
        id: initialData?.id || Date.now(),
        title,
        description,
        dueDate: dueDate.toISOString(),
        completed: initialData?.completed || false,
      });
    }
    onClose();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={titlePlaceholder}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder={descriptionText}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button
        title={`${dueDateText} ${dueDate.toDateString()}`}
        onPress={() => setOpenDatePicker(true)}
      />

      {openDatePicker && (
        <DatePicker
          modal
          open={openDatePicker}
          date={dueDate}
          onConfirm={(date) => {
            setOpenDatePicker(false);
            setDueDate(date);
          }}
          onCancel={() => setOpenDatePicker(false)}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title={save} onPress={handleSave} />
        <Button title={cancel} color="red" onPress={onClose} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
