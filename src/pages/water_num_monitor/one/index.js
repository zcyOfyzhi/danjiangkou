import React, { Component } from 'react';
import {
  View,
  Platform,
  StyleSheet, 
  NativeModules,
  Image,
  Dimensions,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonView, TextView } from '@rich/react-native-richway-component';
import BaseStyle from '../../../css/BaseStyle';
import Circle from '../../../common/Circle.js';
import moment from 'moment';
import { Actionsheet} from 'beeshell';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ChartOne from './Chart1.js';
import ChartTwo from './Chart2.js';
const { width,height } = Dimensions.get('window');



const styles = StyleSheet.create({
  container: {
    
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
  main: {
    width : '100%',
    height : 200,
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    paddingLeft : 20,
    paddingRight : 20,
    paddingBottom : 30,
  },
  left : {
    flex : 1,
    height : 200,
  },
  right : {
    flex : 1,
    height : 200
  },
  info : {
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
  },
  subTitle : {
    padding : 15,
    fontSize : 14,
    lineHeight : 22,
  }
});

export default class Page extends Component {


  constructor(props) {
    super(props);

    this.state = {
      isDateTimePickerVisible: false,
      date: new Date(),
      start: moment().subtract(0, 'days').hour(0).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
    }
  }
   


  btnOneClick = () => {
    this._actionStSheet.open()
  }

  btnTwoClick = () => {
     const { isDateTimePickerVisible, start } = this.state;
      this.setState({
        isDateTimePickerVisible: !isDateTimePickerVisible,
        time: 0,
        date: new Date(moment(start)),
      });
  }

  onConfirm = (dateTime) => {
      this.setState({
        isDateTimePickerVisible: false,
        start: moment(dateTime).hour(0).minute(0)
          .second(0)
          .format('YYYY-MM-DD HH:mm:ss'),
      });
  }

    render() {
      const { isDateTimePickerVisible,date } = this.state;
      return (
        <View style={styles.container}>
          <View style={styles.top}>
              <TextView style={styles.BgTitle}>供水详情</TextView>
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

                <ButtonView
                  style={styles.btnList}
                  onPress={this.btnTwoClick}
                  >
                    <TextView style={{color:'#89AADB',}}>请选择日期</TextView>
                    <Icon
                        name={'ios-arrow-down'}
                        size={18}
                        color={'#89AADB'}
                        style={{marginLeft: 6,}}
                      />
                </ButtonView>
              </View>
          </View>
          
          <TextView style={styles.subTitle}>当前供水量：6.1亿m³，月计划供水量：4.8亿m³，供水偏差超过20%</TextView>
          

          <View style={styles.main}>
            <View style={styles.left}>
                <ChartOne></ChartOne>
                <View style={styles.info}>
                    <TextView>月供水（亿m³）</TextView>
                 </View>
            </View>

            <View style={styles.right}>
                <ChartTwo></ChartTwo>
                <View style={styles.info}>
                    <TextView>年供水（亿m³）</TextView>
                 </View>
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

             <DateTimePicker
                isVisible={isDateTimePickerVisible}
                cancelTextIOS="取消"
                confirmTextIOS="确定"
                titleIOS="选择日期"
                date={date}
                onConfirm={this.onConfirm}
                maximumDate={new Date()}
                onCancel={() => this.setState({ isDateTimePickerVisible: false })}
              />

        </View>
      );
    }
}
