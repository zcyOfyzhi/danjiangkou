import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextView } from '@rich/react-native-richway-component/index';

const styles = StyleSheet.create({
  badge: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    borderWidth: 1,
    padding: 0
  },
});

const setLevel = (data) => {
  let obj;
  switch (data.currentLevel) {
    case '1':
      obj = {
        str: 'Ⅰ',
        color: '#60C5F1',
        borderColor: '#60C5F1',
      };
      break;
    case '2':
      obj = {
        str: 'Ⅱ',
        color: '#00CC99',
        borderColor: '#00CC99',
      };
      break;
    case '3':
      obj = {
        str: 'Ⅲ',
        color: '#FFCC00',
        borderColor: '#FFCC00',
      };
      break;
    case '4':
      obj = {
        str: 'Ⅳ',
        color: '#FF3300',
        borderColor: '#FF3300',
      };
      break;
    case '5':
      obj = {
        str: 'Ⅴ',
        color: '#FF8323',
        borderColor: '#FF8323',
      };
      break;
    case '6':
      obj = {
        str: '劣Ⅴ',
        color: '#333',
        borderColor: '#333',
      };
      break;
    default:
      obj = {
        str: 'Q',
        color: '#fff',
        borderColor: data.warn ? 'red' : 'green',
      };
      break;
  }
  return (
    <View style={[styles.badge, {
      backgroundColor: obj.color,
      borderColor: obj.borderColor,
    }]}
    >
      <TextView style={{
        color: obj.color !== obj.borderColor ? 'gray' : '#fff',
        fontSize: obj.str !== '劣Ⅴ' ? 18 : 12 ,
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 24,
        padding: 0,
      }}
      >
        {obj.str}
      </TextView>
    </View>
  );
};

export default setLevel;
