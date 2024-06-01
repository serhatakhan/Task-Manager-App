import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {Input, Button, Toggle} from '@ui-kitten/components';
import * as Yup from 'yup';

const FormExample = () => {
  const RegisterSchema = Yup.object().shape({
    // buradaki isimlendirmelerin de aynı olması gerekiyor
    name: Yup.string().required('Required'),
    surname: Yup.string().required('Required'),
    email: Yup.string()
      .required('Required')
      .email('Please enter a valid email address'),
    phone: Yup.string()
      .required('Required')
      .min(11, 'Please enter 11 characters')
      .max(13, 'Maximum 13 character'),
    password: Yup.string()
      .required('Required')
      .matches(
        /^(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9ğüşıöçĞÜŞİÖÇ!^+%/()=?_*{[}.:,;/#£$-\]]{8,50})$/,
        'Password requirements are not met'),
      // regex tanımı eklemek için de matches kullanıyoruz
    passwordConfirm: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
    // buradaki ref, nereyle referans göstereceksek onu ifade ediyor. o da bir üstteki password.
    agreementConfirm: Yup.bool()
      .oneOf([true], 'Please accept the privacy agreement')
      .required('Required'),
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 20,
          backgroundColor: '#3366FF',
          minHeight: 125,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          REGISTER
        </Text>
      </View>

      <View style={{flex: 1, padding: 10, paddingBottom: 30}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{
              name: '',
              surname: '',
              email: '',
              phone: '',
              password: '',
              passwordConfirm: '',
              agreementConfirm: false,
            }}
            // yukarıdaki validasyon şemasını buraya entegre etmiş olduk formik özellliği validationSchema
            validationSchema={RegisterSchema}
            onSubmit={values => alert(JSON.stringify(values, 0, 2))}>
            {({
              handleChange,
              handleSubmit,
              values,
              setFieldValue,
              errors,
            }) => (
              <View>
                <Input
                  // bu caption, yukarıda validasyonun içindeki required'ın içinde yazan yazıyı ekrana veriyor
                  caption={errors.name}
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.name}
                  label={'Name'}
                  placeholder="Name"
                  // yukarıdaki email ile(initialValues içindeki) buradaki email aynı olmalı
                  onChangeText={handleChange('name')}
                  // zorunlu alan yazısı input çerçevesi kırmızı oldu
                  status={errors.name ? 'danger' : 'basic'}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.surname}
                  label={'Surname'}
                  placeholder="Surname"
                  // yukarıdaki email ile(initialValues içindeki) buradaki email aynı olmalı
                  onChangeText={handleChange('surname')}
                  caption={errors.surname}
                  status={errors.surname ? 'danger' : 'basic'}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.email}
                  label={'Email'}
                  placeholder="Email"
                  // yukarıdaki email ile(initialValues içindeki) buradaki email aynı olmalı
                  onChangeText={handleChange('email')}
                  caption={errors.email}
                  status={errors.email ? 'danger' : 'basic'}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.phone}
                  label={'Phone'}
                  placeholder="Phone"
                  // yukarıdaki email ile(initialValues içindeki) buradaki email aynı olmalı
                  onChangeText={handleChange('phone')}
                  caption={errors.phone}
                  status={errors.phone ? 'danger' : 'basic'}
                />
                <Input
                  // şifre alanında noktalı görünüm sağlar
                  secureTextEntry
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.password}
                  label={'Password'}
                  placeholder="Password"
                  // yukarıdaki email ile(initialValues içindeki) buradaki email aynı olmalı
                  onChangeText={handleChange('password')}
                  caption={errors.password}
                  status={errors.password ? 'danger' : 'basic'}
                />
                <Input
                  secureTextEntry
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.passwordConfirm}
                  label={'Password Confirm'}
                  placeholder="Password Confirm"
                  // yukarıdaki email ile(initialValues içindeki) buradaki email aynı olmalı
                  onChangeText={handleChange('passwordConfirm')}
                  caption={errors.passwordConfirm}
                  status={errors.passwordConfirm ? 'danger' : 'basic'}
                />
                <View style={{marginTop: 5}}>
                  <Toggle
                    checked={values.agreementConfirm}
                    onChange={value =>
                      setFieldValue('agreementConfirm', value)
                    }>
                    I accept the privacy agreement.
                  </Toggle>
                  {/* buraya da hata mesajını yazdık */}
                  {errors.agreementConfirm && (
                    <Text style={{color: 'red'}}>
                      {errors.agreementConfirm}
                    </Text>
                  )}
                </View>
                <Button
                  status="primary"
                  style={{marginTop: 30}}
                  onPress={handleSubmit}>
                  SAVE
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FormExample;
