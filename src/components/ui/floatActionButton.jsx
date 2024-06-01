import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Add} from 'iconsax-react-native';

const FloatActionButton = (props) => {
  return (
    // {...props} yaparak gelen tüm propsları al diyoruz.
    <TouchableOpacity {...props} style={styles.container}>
      <Add size="35" color="#C2D9FF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7752FE',
    width: 70,
    height: 70,
    borderRadius: 1000,
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
});

export default FloatActionButton;
