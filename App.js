import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-paper';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://10.23.42.163:5000/tasks')
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Add a new task
  const addTask = () => {
    if (!task) return; 
    axios.post('http://10.23.42.163:5000/tasks', { task })
      .then(response => {
        setTasks([...tasks, response.data]);
        setTask('');
      })
      .catch(error => {
        console.error(error);
      });
  };

 

  return (
    <View style={{ padding: 20, marginTop:80 }}>
      <TextInput
        value={task}
        onChangeText={setTask}
        placeholder="Enter task"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Add Task" onPress={addTask} />
      
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <Card style={{ marginVertical: 10 }}>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 18 }}>{item.task}</Text>
               
              </View>
            </Card>
          )}
        />
      )}
    </View>
  );
};

export default App;
