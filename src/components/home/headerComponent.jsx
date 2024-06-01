import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {
    ArrowCircleRight2,
  ChartCircle,
  Clock,
  CloseCircle,
  TickCircle,
} from 'iconsax-react-native';
import AppColors from '../../theme/colors';

const HeaderComponent = ({ongoing, pending, complated, cancel}) => {
  const tasks = [
    {
      id: 1,
      title: 'Ongoing',
      color: AppColors.ONGOING,
      icon: <ChartCircle size="32" color={AppColors.WHITE}/>,
      count: ongoing
    },
    {
      id: 2,
      title: 'Pending',
      color: AppColors.PENDING,
      icon: <Clock size="32" color={AppColors.WHITE}/>,
      count: pending
    },
    {
      id: 3,
      title: 'Completed',
      color: AppColors.COMPLETED,
      icon: <TickCircle size="32" color={AppColors.WHITE}/>,
      count: complated
    },
    {
      id: 4,
      title: 'Cancel',
      color: AppColors.CANCEL,
      icon: <CloseCircle size="32" color={AppColors.WHITE}/>,
      count: cancel
    },
  ];

  const Task = ({item})=>{
    return(
        <Pressable style={{width: "45%", backgroundColor: item.color, padding: 10, margin: 10, borderRadius: 10}}>
            {item.icon}
            <View style={{marginTop:30, flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
                <View>
                    <Text style={{color: AppColors.WHITE, fontSize: 14, fontWeight: "600"}}>{item.title}</Text>
                    <Text style={{color: AppColors.WHITE, fontSize: 16, fontWeight: "600", marginTop: 5}}>{item.count} Tasks</Text>
                </View>
                <View>
                    <ArrowCircleRight2 size="22" color="#fff"/>
                </View>
            </View>
        </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        // 2 sütun olsun bunun çalışması için renderıtem'ın döndürdüğü Task'ın width'ini 45% yaptık
        numColumns={2}
        data={tasks}
        renderItem={({item}) => <Task item={item} />}
      />

      <View>
        <Text style={{fontSize: 18, fontWeight: "500", margin: 10, marginHorizontal: 12}}>All Tasks</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HeaderComponent;
