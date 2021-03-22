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
import IconOne from '../../../image/3.png';
import IconTwo from '../../../image/2.png';
import EarthquakChart from './earthquakChart';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth : 1,
    borderColor : '#EEE',
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
  right : {
    width : '20%',
  },
  number : {
    fontSize : 28,
    color : '#333',
    fontWeight : 'bold',
  },
  letter : {
    marginTop : 10,
    marginLeft : 5,
  },
  text : {
    fontSize : 12
  }

});

export default class EarthquakeInfo extends Component {
  static propTypes = {
    dzList :PropTypes.array
  }

  static defaultProps = {
    dzList : []
  }

  constructor(props) {
    super(props);
    this.state = {
      dzList : [],
      numOne : '',
      numTwo : '',
      numThree : '',
      numFour : ''
    }
  }

  
  componentWillReceiveProps(nextProps) {
    const {dzList} = nextProps;
    this.setState({
      dzList : dzList,
      numOne : dzList[0].total,
      numTwo : dzList[1].total,
      numThree : dzList[2].total,
      numFour : dzList[3].total
    });
}


 


    render() {
      const { numOne, numTwo,numThree,numFour,dzList} = this.state;
      return (
        <View style={styles.container}>
          
          <View style={styles.title}>
            <Image source={IconOne} style={styles.icon} />
            <TextView style={styles.titleText}>地震总数</TextView>
          </View>

          <View style={styles.main}>
            <View style={styles.left}>
               <View style={styles.item}>
                  <View style={styles.itemTop}>
                     <TextView style={styles.circle}></TextView>
                     <TextView style={styles.text}>&lt;2.0级</TextView>
                  </View>

                  <View style={styles.itemBottom}>
                     <TextView style={styles.number}>{numOne}</TextView>
                     <TextView style={styles.letter}>次</TextView>
                  </View>
               </View>

               <View style={styles.item}>
                  <View style={styles.itemTop}>
                     <TextView style={[styles.circle, { backgroundColor: '#33C9A7' }]}></TextView>
                     <TextView style={styles.text}>2.0~3.0</TextView>
                  </View>

                  <View style={styles.itemBottom}>
                     <TextView style={styles.number}>{numTwo}</TextView>
                     <TextView style={styles.letter}>次</TextView>
                  </View>
               </View>

               <View style={styles.item}>
                  <View style={styles.itemTop}>
                     <TextView style={[styles.circle, { backgroundColor: '#F8E71C' }]}></TextView>
                     <TextView style={styles.text}>3.0~4.0</TextView>
                  </View>

                  <View style={styles.itemBottom}>
                     <TextView style={styles.number}>{numThree}</TextView>
                     <TextView style={styles.letter}>次</TextView>
                  </View>
               </View>

               <View style={styles.item}>
                  <View style={styles.itemTop}>
                     <TextView style={[styles.circle, { backgroundColor: '#EB1954' }]}></TextView>
                     <TextView style={styles.text}>&ge;4.0</TextView>
                  </View>

                  <View style={styles.itemBottom}>
                     <TextView style={styles.number}>{numFour}</TextView>
                     <TextView style={styles.letter}>次</TextView>
                  </View>
               </View>

            </View> 

            <View style={styles.right}>
               <EarthquakChart dzList={dzList}></EarthquakChart>
            </View>   
              
          </View>


        </View>
      );
    }
}
