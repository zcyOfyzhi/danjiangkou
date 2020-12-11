import React, { Component } from 'react';
import {
  View,
  Platform,
  StyleSheet, 
  NativeModules,
  Image
} from 'react-native';
import { ButtonView, TextView } from '@rich/react-native-richway-component';
import BaseStyle from '../../../css/BaseStyle';
import IconOne from '../../../image/6.png';

const styles = StyleSheet.create({
  container: {
    margin : 10,
    paddingLeft : '2%',
    paddingRight : '2%',
    paddingBottom : 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  title :{
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    marginTop : 15,
  },
  titleText : {
    marginLeft : 10,
    fontSize : 14,
    color : '#333',
    fontWeight : 'bold'
  },
  main : {
    height : 100,
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
  },
  left : {
    flex : 1,
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
  },
  item : {
     flex : 1,
  },
  itemTop : {
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center'
  },
  circle : {
    width : 8,
    height : 8,
    borderRadius : 8,
    backgroundColor : '#3385FF',
    marginRight : 8,
  },
  itemBottom : {
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center'
  },
  number : {
    fontSize : 28,
    color : '#333',
    fontWeight : 'bold',
  },
  letter : {
    marginTop : 10,
    marginLeft : 5,
  }

});

export default class EarthquakeInfo extends Component {


  constructor(props) {
    super(props);
  }


    render() {
      return (
        <View style={styles.container}>
          
          <View style={styles.title}>
            <Image source={IconOne} style={styles.icon} />
            <TextView style={styles.titleText}>鱼类放流统计</TextView>
          </View>

          <View style={styles.main}>
            <View style={styles.left}>
               <View style={styles.item}>
                  <View style={styles.itemTop}>
                     <TextView style={styles.circle}></TextView>
                     <TextView>配对</TextView>
                  </View>

                  <View style={styles.itemBottom}>
                     <TextView style={styles.number}>19</TextView>
                     <TextView style={styles.letter}>对</TextView>
                  </View>
               </View>

               <View style={styles.item}>
                  <View style={styles.itemTop}>
                     <TextView style={[styles.circle, { backgroundColor: '#F5A623' }]}></TextView>
                     <TextView>产生苗种</TextView>
                  </View>

                  <View style={styles.itemBottom}>
                     <TextView style={styles.number}>30</TextView>
                     <TextView style={styles.letter}>批</TextView>
                  </View>
               </View>

               <View style={styles.item}>
                  <View style={styles.itemTop}>
                     <TextView style={[styles.circle, { backgroundColor: '#F5A623' }]}></TextView>
                     <TextView>放流</TextView>
                  </View>

                  <View style={styles.itemBottom}>
                     <TextView style={styles.number}>30</TextView>
                     <TextView style={styles.letter}>次</TextView>
                  </View>
               </View>

               
            </View>  
              
          </View>


        </View>
      );
    }
}
