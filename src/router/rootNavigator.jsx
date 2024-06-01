import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import { ADDTASKS, TASKDETAIL, TASKS } from '../utils/routes';
import AddTask from '../screens/addTask';
import TaskDetail from '../screens/taskDetail';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: "#f2f2f2",
      },
      headerShadowVisible: false
    }}>
      <Stack.Screen name={TASKS} component={Home} />
      <Stack.Screen name={ADDTASKS} component={AddTask} options={{
        headerBackTitleVisible: false,
      }}/>
      <Stack.Screen name={TASKDETAIL} component={TaskDetail} options={{
        headerBackTitleVisible: false,
        headerStyle: {backgroundColor: "white"}
      }} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
