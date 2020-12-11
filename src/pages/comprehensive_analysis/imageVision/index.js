import React, { Component } from 'react';
import {
  View,
  Platform,
  StyleSheet, 
  NativeModules,
  Image,
  Dimensions
} from 'react-native';
import { ButtonView, TextView } from '@rich/react-native-richway-component';
import BaseStyle from '../../../css/BaseStyle';
const { width } = Dimensions.get(`window`);
import ImageView from "../../../common/ImageView";
import Service from '../../../base/Service';

const styles = StyleSheet.create({
  container: {
    borderRadius : 6,
    backgroundColor : '#fff',
    margin : 20,
    marginTop: 0,
  },
  BgTitle : {
    fontSize : 20,
    color : '#141F2E',
    margin : 20,
  },
  stationImage: {
    margin : 20,
    backgroundColor : '#ABCDEF'
  },
  letter : {
    marginLeft : 20,
    color : '#333'
  },
  detInfo : {
    paddingLeft : 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent : 'space-between',
    color : '#333',
    marginBottom: 20,
  },
  top : {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  button : {
    marginRight: 5,
    paddingBottom: 6,
  },
  active :{
    borderBottomColor: '#333',
    borderBottomWidth: 2,
  }

  
});

export default class ReserColumn extends Component {


  constructor(props) {
    super(props);

    this.state = {
      typecode : 'one'
    }
  }

  buttonClickHandler= (value) => {
    this.setState({
      typecode : value
    });
  }


    render() {
      return (
        <View style={styles.container}>
          <TextView style={styles.BgTitle}>图像识别</TextView>
          
          <View style={styles.top}>
            <ButtonView
              style={
                [styles.button,this.state.typecode===`one` ? styles.active : '']
              }
              onPress={() => {
                this.buttonClickHandler('one');
              }}
            >
              <TextView style={styles.text}>陶岔</TextView>
            </ButtonView>
            <ButtonView
              style={
                [styles.button,this.state.typecode===`two` ? styles.active : '']
              }
              onPress={() => {
                this.buttonClickHandler('two');
              }}
            >
              <TextView style={styles.text}>清泉沟</TextView>
            </ButtonView>
          </View>

          <View style={styles.stationImage}>
              <ImageView src={Service.ImageHost} width={width - 80} height={(width - 80) * 0.75}></ImageView>
          </View>

          <View style={styles.letter}>
             <TextView>漂浮物识别</TextView>
          </View>

          <View style={styles.detInfo}>
             <TextView>水位：25.27m</TextView>
             <TextView>置信度：93.20%</TextView>
          </View>

        </View>
      );
    }
}
