import AsyncStorage from '@react-native-async-storage/async-storage';
interface Todo {
  title: string;
}
export const storeTodoData = async (todoData: Todo[]) => {
  try {
    const jsonValue = JSON.stringify(todoData);
    await AsyncStorage.setItem('todo-data', jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getTodoData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('todo-data');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
