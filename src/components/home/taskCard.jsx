import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { taskValues } from '../../utils/constants';
import { setCategory } from '../../utils/functions';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { TASKDETAIL } from '../../utils/routes';

const TaskCard = ({item}) => {
  const navigation = useNavigation()

  return (
    <Pressable style={styles.container} onPress={()=> navigation.navigate(TASKDETAIL, {item:item})}>
       <View
        style={{
          backgroundColor: taskValues.find(task => task.status === item?.status)
            ?.color,
          padding: 3,
          borderRadius: 5,
        }}>
        {taskValues.find(task => task.status === item?.status)?.icon}
      </View>

      <View style={{flex: 1, marginLeft: 10}}>
        <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
          {item.title}
        </Text>
        <Text style={{fontSize: 14, fontWeight: '400', color: 'gray', marginVertical: 3}}>
          {item.description}
        </Text>

        <View>
          <Text style={{fontSize: 14, fontWeight: '300', color: 'gray'}}>
            {moment(item.startDate).format('DD/MM/YYYY')}-
            {moment(item.endDate).format('DD/MM/YYYY')}
          </Text>
        </View>
      </View>

      <View style={{marginLeft: 10}}>
        <Text style={{fontSize: 14, fontWeight: '300', color: 'gray'}}>
          {setCategory(item.category)}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: "#7752FE",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: 4,
    padding: 14,
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center"
  },
});

export default TaskCard;
