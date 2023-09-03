import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
export const CustomInput = ({
  value,
  onChangeText,
  icon,
  placeholder,
  inputStyle,
  maxLength,
  keyboardType,
}) => {
  return (
    <View>
      <TextInput
        keyboardType={keyboardType || 'default'}
        maxLength={maxLength}
        style={[styles.InputFields, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  InputFields: {
    height: 38,
    backgroundColor: '#efefef',
    borderWidth: 0.5,
    borderColor: '#dbdbdb',
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    marginVertical: 5,
  },
});
