import React from 'react';
import {Formik} from 'formik';
import {View, StyleSheet} from 'react-native';
import {Input, Button, Radio, RadioGroup} from '@ui-kitten/components';
import CustomDatePicker from '../../components/ui/customDatePicker';
import {taskSchema} from '../../utils/validations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { status } from '../../utils/constants';
import uuid from 'react-native-uuid';

const AddTask = () => {
  
  const saveTask = async (values) => {
    try {
      // storage'e kaydedilenleri tasks keyi ile çağır
      const savedTasks = await AsyncStorage.getItem("tasks")
      // savedTask'ımız varsa, oluşturulmuşsa parse edip js verisine çevir. yoksa boş dizi ata oluşturduğumuz değişkene.
      let myTask = savedTasks ? JSON.parse(savedTasks) : []
      myTask.push(values)
      // sonra oluşturğumuz taskı kaydedebilmek için stringe çevirmek gerekiyor JSON.stringify ile.
      await AsyncStorage.setItem("tasks", JSON.stringify(myTask));
      console.log("kayıt başarılı")
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          id: uuid.v4(),
          title: 'Async Storage',
          description: 'Learn async storage methods',
          startDate: null, // başlangıç değerini vermiş oluyoruz.
          endDate: null,
          category: null, // null yaptık ki başlangıçta seçilmemiş şekilde olsun.
          status: status.ONGOING, // başka bir yerde tanımlayıp burada çağırdık başlangıç değerini. task'ın başlangıç değeri yapım aşamasında olur o yüzden ongoing yaptık.
        }}
        // validasyon şemasını buraya entegre etmiş olduk formik'in özellliğidir validationSchema
        validationSchema={taskSchema}
        // Formik gönderildiğinde veriler storage'a kaydedilsin !!
        onSubmit={values => saveTask(values)}>

        {({handleChange, handleSubmit, values, setFieldValue, errors}) => (
          <View>
            <Input
              // bu caption, validasyonun içindeki required'ın içinde yazan yazıyı ekrana veriyor
              caption={errors.title}
              size="large"
              style={{marginVertical: 10}}
              value={values.title}
              label={'Title'}
              placeholder=""
              // yukarıdaki title ile(initialValues içindeki) buradaki title aynı olmalı !!
              onChangeText={handleChange('title')}
              // zorunlu alan yazısı input çerçevesi kırmızı oldu
              status={errors.title ? 'danger' : 'basic'}
            />
            <Input
              // multiline olunca inputta yer kalmayınca aşağı satırlara geçer !
              multiline
              caption={errors.description}
              size="large"
              style={{marginVertical: 10}}
              value={values.description}
              label={'Description'}
              placeholder=""
              // yukarıdaki description ile(initialValues içindeki) buradaki description aynı olmalı !!
              onChangeText={handleChange('description')}
              // zorunlu alan yazısı input çerçevesi kırmızı oldu
              status={errors.description ? 'danger' : 'basic'}
            />
            <CustomDatePicker
              caption={errors.startDate}
              size="large"
              style={{marginVertical: 10}}
              date={values.startDate}
              label={'Starting Date'}
              onSelectDate={date => setFieldValue('startDate', date)}
              status={errors.startDate ? 'danger' : 'basic'}
            />
            <CustomDatePicker
              caption={errors.endDate}
              size="large"
              style={{marginVertical: 10}}
              date={values.endDate}
              label={'End Date'}
              onSelectDate={date => setFieldValue('endDate', date)}
              status={errors.endDate ? 'danger' : 'basic'}
            />
            <RadioGroup
              selectedIndex={values.category}
              onChange={index => setFieldValue('category', index)}>
              <Radio status="primary">Software</Radio>
              <Radio status="primary">Design</Radio>
              <Radio status="primary">Debugging</Radio>
            </RadioGroup>

            <Button
              status="primary"
              style={{marginTop: 30}}
              onPress={handleSubmit}>
              CREATE
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default AddTask;
