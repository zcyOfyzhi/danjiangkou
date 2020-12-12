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
//import Video from 'react-native-video';
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
    marginTop: 10,
    backgroundColor : '#ABCDEF'
  },
  letter : {
    marginLeft : 20,
    color : '#333',
    marginBottom: 20,
  },

  
});

export default class ReserColumn extends Component {


  constructor(props) {
    super(props);

    this.state = {
    }
  }
   
  onLoad = () => {
    console.log('=--laod---');
  }

  onError = () => {
    console.log('---error---');
  }

  onLoadStart = () => {
    console.log('=--onLoadStart---');
  }

    render() {
      return (
        <View style={styles.container}>
          <TextView style={styles.BgTitle}>视频</TextView>
          
              <View style={styles.stationImage}>
              <Video 
                  ref={(c) => { this._video = c; }}
                  source={{uri: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'}}  
                  onEnd={() => {}}
                  resizeMode="cover"
                  posterResizeMode="cover"
                  onLoad={this.onLoad} 
                  onError={this.onError}
                  onLoadStart={this.onLoadStart}
                  style={{width : '100%',height : 300 }}
              />
          </View>

          <View style={styles.letter}>
             <TextView>XXX区视频站</TextView>
          </View>

        </View>
      );
    }
}
