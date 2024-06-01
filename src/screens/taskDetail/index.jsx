import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import AppColors from '../../theme/colors';
import {Button, Divider} from '@ui-kitten/components';
import moment from 'moment';
import { setCategory } from '../../utils/functions';
import { status, taskValues } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// buraya item'ı yolladık. almak için route'u çağırıyoruz. route'un içinde item geliyor
const TaskDetail = ({route}) => {
  const {item} = route?.params;

  const deleteTask = async () => {
    try {
      // Mevcut taskları al
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks === null) {
        return; // task yoksa işlemi sonlandır
      }
      const tasks = JSON.parse(savedTasks); //gelen taskları js verisine çevir

      // Silinecek taskı belirle
      const filteredTasks = tasks.filter(task => task.id !== item.id);

      // Filtrelenmiş taskları depola
      await AsyncStorage.setItem('tasks', JSON.stringify(filteredTasks));
      console.log('task silindi.');
    } catch (error) {
      console.error('task silinirken hata oluştu:', error);
    }
  };

  const updateTask = async newStatus => {
    try {
      // Mevcut taskları al
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks === null) {
        return; // task yoksa işlemi sonlandır
      }
      const tasks = JSON.parse(savedTasks); // storage'dan string gelen veriyi parse et

      // Güncellenecek taskı bul
      const updatedTasks = tasks.map(task => {
        if (task.id === item.id) {
          return {
            ...task,
            status: newStatus, // Yeni durumu uygula
          };
        }
        return task;
      });

      // Güncellenmiş taskları depola
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      console.log('task güncellendi:', updatedTasks);
    } catch (error) {
      console.error('task güncellenirken hata oluştu:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Title</Text>
          <Text style={{fontSize: 16}}>{item.title}</Text>
        </View>
        <Divider />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Description</Text>
          <Text style={{fontSize: 16}}>{item.description}</Text>
        </View>
        <Divider />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Start Date</Text>
          <Text style={{fontSize: 16}}>{moment(item.startDate).format('DD/MM/YYYY')}</Text>
        </View>
        <Divider />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>End Date</Text>
          <Text style={{fontSize: 16}}>{moment(item.endDate).format('DD/MM/YYYY')}</Text>
        </View>
        <Divider />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Category</Text>
          <Text style={{fontSize: 16}}>{setCategory(item.category)}</Text>
        </View>
        <Divider />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Status</Text>
          <Text style={{fontSize: 16}}>{taskValues.find(task => task.status === item?.status).title}</Text>
        </View>
        <Divider />
      </ScrollView>

        <View style={{bottom: 20}}>
          <Button onPress={()=> updateTask(status.PENDING)} style={styles.button} status="primary">
            START
          </Button>

          <Button onPress={()=> updateTask(status.COMPLETED)} style={styles.button} status="success">
            COMPLETED
          </Button>

          <Button onPress={()=> updateTask(status.CANCEL)} style={styles.button} status="danger">
            CANCEL
          </Button>

          <Button onPress={deleteTask} style={styles.button} status="warning">
            DELETE
          </Button>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
    padding: 12,
  },
  button: {
    marginVertical: 5,
  },
});

export default TaskDetail;
