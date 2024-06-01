import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageExample = () => {
  const [token, setToken] = useState('');

  const setMyToken = async value => {
    try {
      // stroage'a token keyi ile kaydetti !! aşağıda save butonuna basınca
      // value'yi storage'a kaydettik
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      // saving error
    }
  };
  const getMyToken = async value => {
    try {
      // storage'a yollarkenki key değeriyle buradaki key değeri(token) aynı olmalı.
      // burada artık token'i çağırdığımızda token'i getirmiş olacak !!!
      const token = await AsyncStorage.getItem('token');
      setToken(token);
    } catch (e) {
      // saving error
    }
  };
  // sayfa ekrana geldiğinde ismi ekrana getir
  useEffect(() => {
    getMyToken();
  }, []);

  const removeMyToken = async value => {
    try {
      // storage'dan silemk için key değerini veriyoruz
      const token = await AsyncStorage.removeItem('token');
      setToken(token);
    } catch (e) {
      // saving error
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, padding: 15}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{token}</Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          setMyToken(
            'AJqril93bK8t0FF5yiRba51qi5KvZeEo1q1Jses1rfrB2ery8tXLdhv3P8qHDsfA',
          )
        }
        style={{
          backgroundColor: 'blue',
          padding: 15,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20,
          borderRadius: 100,
        }}>
        <Text style={{color: 'white'}}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => removeMyToken()}
        style={{
          backgroundColor: 'red',
          padding: 15,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20,
          borderRadius: 100,
        }}>
        <Text style={{color: 'white'}}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StorageExample;
