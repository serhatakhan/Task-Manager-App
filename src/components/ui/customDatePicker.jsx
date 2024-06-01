import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {Datepicker} from '@ui-kitten/components';

const CustomDatePicker = (props) => {
    // const [date, setDate] = useState(new Date()) --> bunu addTask screeninde startDate: new Date(), şeklinde başlangıç değeri olarak verdik. o yüzden burada gerek kalmadı.

    const {onSelectDate} = props // böyle bir prop yolladık AddTask'ten. onu da burada yakalayıp onSelect ayarına verdik.

    return (
        <Datepicker
        // gelen tüm propları alsın {...props} 
        {...props}
        // date={date} --> bunu addTask screeninde date={values.startDate} şeklinde verdik. o yüzden burada gerek kalmadı.
        onSelect={nextDate => onSelectDate(nextDate)}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

export default CustomDatePicker;
