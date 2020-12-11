import React, { Component } from 'react';
import {
  View,
  Platform,
  StyleSheet,
  NativeModules,
  ScrollView,
  Dimensions,
  StatusBar,
  Text
} from 'react-native';
import { ButtonView, TextView } from '@rich/react-native-richway-component';
import BaseStyle from '../../css/BaseStyle';
import HeadButton from '../../common/HeadButton';
import SlideMenu from '../../common/slideMenu';
import { SlideModal } from 'beeshell';
const window = Dimensions.get('window');
const screenHeight =  window.height;
import TitleBar from "../../components/TitleBar";
import Icon from 'react-native-vector-icons/Ionicons';
import TopInfo from './topInfo.js';
import DeviceStatus from './deviceStatus.js';
import DeviceType from './deviceType.js';
import WarnStatus from './warnStatus.js';

const styles = StyleSheet.create({
  container: {
    backgroundColor: BaseStyle.backgroundColor,
    flex: 1,
    
  },
  flex: {
    flex: 1
},
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    color: 'gray',
  },
  title: {
    color: 'gray',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  top: {
    width : '100%',
    height : 120,
    backgroundColor : BaseStyle.themeColor,
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center'
  },
  topItem : {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorOne: {
    color: '#fff',
    fontSize: 12,
    marginBottom:5
  },
  colorTwo: {
    color: '#fff',
    fontSize: 28,
    fontWeight : 'bold'
  },
  
  
});

export default class About extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: () => (
      <TitleBar
        contentRender={() => {
          return (
            <View
              style={{
                height: 60,
                justifyContent: "center",
                flexDirection: "row",
                alignItems : 'center',
                width: "100%"
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  textAlign: "left",
                  flex : 1,
                  paddingLeft : 20,
                }}
              >
              大坝管理
              </Text>
              <View
              style={{
                  width : 30,
                  marginRight : 10,
                }}
                onPress={navigation.state.params && navigation.state.params.onPress}
                />

               <Icon
                name={'ios-list'}
                size={42}
                color="white"
                style={{
                 paddingRight : 15,
                 fontWeight : 'bold'
                }}
                onPress={navigation.state.params && navigation.state.params.onPress}
              /> 
                
            </View>
          );
        }}
      ></TitleBar>
    )
  });


  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ onPress: this.handleHeaderOnPress});
  }

  handleHeaderOnPress = () => {
    this._slideModal.open();
  }

  _setName = () => {
    this._slideModal.close();
  }

  
    render() {
      return (
        <View style={[styles.container]}>
        
        <ScrollView
            style={styles.flex}
            scrollEnabled={true}
        >
            <View>
               <TopInfo></TopInfo>
            </View>

            <View>
              <DeviceStatus></DeviceStatus>
            </View>

            <View>
              <DeviceType></DeviceType>
            </View>
            
            <View>
              <WarnStatus></WarnStatus>
            </View>
          </ScrollView>

          <SlideModal
            ref={(c) => { this._slideModal = c; }}
            cancelable={true}
            screenHeight={screenHeight}
            offsetX={window.width}
            offsetY={StatusBar.currentHeight + 40}
            direction='left'
            >
             <SlideMenu
                navigate={this.props.navigation.navigate} 
                _setName = {this._setName.bind(this)}
             ></SlideMenu>
          </SlideModal>

        </View>
      );
    }
}
