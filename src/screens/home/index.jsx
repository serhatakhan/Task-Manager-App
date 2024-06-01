import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native';
import FloatActionButton from '../../components/ui/floatActionButton';
import {ADDTASKS} from '../../utils/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskCard from '../../components/home/taskCard';
import HeaderComponent from '../../components/home/headerComponent';

const Home = ({navigation}) => {
  // * storage'a kaydedilen ve bu screen'de çağırdığımız verileri render etmek için state tuttuk.
  // * bu veriler storage'de tutulduğu için silinmeyecek
  const [tasks, setTasks] = useState([]);
  const [ongoing, setOngoing] = useState(0);
  const [pending, setPending] = useState(0);
  const [complated, setComplated] = useState(0);
  const [cancel, setCancel] = useState(0);
  // refresh ile ilgili state
  const [refreshing, setRefreshing] = useState(false)

  const getTask = async () => {
    try {
      // key'i tasks olanları getir
      const savedTask = await AsyncStorage.getItem('tasks');
      // js verisine çevirip state'i güncelle
      setTasks(JSON.parse(savedTask))

      let ongoingCount=0
      let pendingCount=0
      let complatedCount=0
      let cancelCount=0
      for (const task of JSON.parse(savedTask)){
        if(task.status === 1){
          ongoingCount++
        }
        if(task.status === 2){
          pendingCount++
        }
        if(task.status === 3){
          complatedCount++
        }
        if(task.status === 4){
          cancelCount++
        }
        setOngoing(ongoingCount)
        setPending(pendingCount)
        setComplated(complatedCount)
        setCancel(cancelCount)
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);


  const onRefresh = () =>{
    setRefreshing(true)   // Yenileme başladığında refreshing state'ini true yap
    getTask()          // Görevleri yeniden al
    setRefreshing(false)  // Yenileme bittiğinde refreshing state'ini false yap
  }


  return (
    <View style={styles.container}>
      <FlatList
      showsVerticalScrollIndicator={false}
      data={tasks}
      // listenin başına ekleme yapmak istediğimizde
      ListHeaderComponent={<HeaderComponent ongoing={ongoing} pending={pending} complated={complated} cancel={cancel} />}
      renderItem={({item})=> <TaskCard item={item} />}
      // refreshControl propu kullanarak pull-to-refresh işlevselliği ekleniyor !!
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <FloatActionButton onPress={() => navigation.navigate(ADDTASKS)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 26
  },
});

export default Home;
