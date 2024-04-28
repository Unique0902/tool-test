import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import { getTodoData, storeTodoData } from './store/asyncStorage';

interface Todo {
  title: string;
}

const MedicineDetailScreen: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [text, setText] = React.useState<string>('');
  useEffect(() => {
    getTodoData().then((data) => {
      if (data) {
        setTodos(data);
      }
    });
  }, []);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 100 }}>
      <Text>Todo App</Text>
      {/* TODO Input Bar */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          alignItems: 'center',
          borderBottomColor: '#000',
          borderBottomWidth: 1,
        }}
      >
        <TextInput
          placeholder='Enter Todo'
          defaultValue={text}
          onChangeText={(text) => setText(text)}
          style={{
            borderWidth: 2,
            borderColor: '#000',
            width: '70%',
            height: 40,
            borderRadius: 5,
            padding: 10,
          }}
        />
        <Button
          title='Add Todo'
          onPress={() => {
            setTodos([...todos, { title: text }]);
            storeTodoData([...todos, { title: text }]);
            setText('');
          }}
        />
      </View>
      {/* TODO List */}
      <FlatList
        data={todos}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#000',
              alignItems: 'center',
            }}
          >
            <Text>{item.title}</Text>
            <Button
              title='Delete'
              color={'red'}
              onPress={() => {
                setTodos(todos.filter((todo) => todo.title !== item.title));
                storeTodoData(
                  todos.filter((todo) => todo.title !== item.title)
                );
              }}
            />
          </View>
        )}
      />
      {/* TODO Delete All Button */}
      <Button
        title='Delete All'
        color={'red'}
        onPress={() => {
          setTodos([]);
          storeTodoData([]);
        }}
      />
    </ScrollView>
  );
};

export default MedicineDetailScreen;
