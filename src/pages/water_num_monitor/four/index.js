import React, { Component } from 'react';
import {
  View,
  Platform,
  StyleSheet, 
  NativeModules,
  Image,
  Text
} from 'react-native';
import { ButtonView, TextView } from '@rich/react-native-richway-component';
import { Actionsheet} from 'beeshell';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseStyle from '../../../css/BaseStyle';
import Chart from './Chart.js';


const styles = StyleSheet.create({
  container: {
    borderRadius : 6,
    backgroundColor : '#fff',
    margin : 20,
    marginTop : 0,
  },
  top : {
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  BgTitle : {
    fontSize : 20,
    color : '#141F2E',
    margin : 20,
    marginBottom : 10,
  },
  topRight : {
    display : 'flex',
    flexDirection : 'row',
    marginTop : 20,
  },
  btnList : {
    display : 'flex',
    flexDirection : 'row',
    marginRight : 20,
  },
  info : {
    padding : 15,
  },
  infoLetter : {
    fontSize : 12,
    color : '#333',
    lineHeight : 24,
  },
  main: {
    height : 320,
    display : 'flex',
  },
  mainTop : {
    flex : 1,
  },
  bottom : {
    height : 60,
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-between',
    paddingLeft : 20,
    paddingRight : 20,
  },
  item : {
    display : 'flex',
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent : 'space-between',
    marginBottom: 8,
    
  },
  itemLeft : {
    display : 'flex',
    flexDirection : 'row',
    alignItems: 'center',
    
  },
  circle : {
    width : 8,
    height : 8,
    borderRadius : 8,
    backgroundColor : '#3385FF',
    marginRight : 5,
  },


  
});

export default class Page extends Component {


  constructor(props) {
    super(props);

    this.state = {
      color : ['#409EFF', '#FF5050', '#FFC30F', '#67C23A'],
      dataList : [
        {value: 69,name: '无问题' },
        {value: 12,name: '有问题'},
        {value: 10,name: '待处理'},
        {value: 9,name: '已处理'}
      ]
    }
  }

  btnOneClick = () => {
    this._actionStSheet.open()
  }


    render() {
      const {color,dataList} = this.state;
      return (
        <View style={styles.container}>
          
          <View style={styles.top}>
              <TextView style={styles.BgTitle}>供水曲线图</TextView>
              <View style={styles.topRight}>
                  <ButtonView
                      style={styles.btnList}
                      onPress={this.btnOneClick}
                  >
                    <TextView style={{color:'#89AADB',}}>请选择测站</TextView>
                    <Icon
                        name={'ios-arrow-down'}
                        size={18}
                        color={'#89AADB'}
                        style={{marginLeft: 6,}}
                      />
                </ButtonView>
              </View>
          </View>

          <View style={styles.main}>
            <View style={styles.mainTop}>
              <Chart></Chart>
            </View>
            

          </View>

          <Actionsheet
                  ref={(c) => { this._actionStSheet = c; }}
                  header='测站列表'
                  maxShowNum = '4'
                  data={[
                    {
                      label: '测站1',
                      value: 'st1'
                    },
                    {
                      label: '测站2',
                      value: 'st2',
                    },
                    {
                      label: '测站3',
                      value: 'st3',
                    },
                    {
                      label: '测站4',
                      value: 'st4',
                    }
                  ]}
                  cancelable={false}
                  onPressConfirm={(item) => {
                     console.log(item);
                  }} 
                  onPressCancel={() => {
                    console.log('cancel')
                  }}>
            </Actionsheet>

        </View>
      );
    }
}
