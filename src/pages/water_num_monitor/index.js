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

import OnePanel from './one/index.js';
import TwoPanel from './two/index.js';
import ThreePanel from './three/index.js';
import FourPanel from './four/index.js';

const styles = StyleSheet.create({
  container: {
    backgroundColor: BaseStyle.backgroundColor,
    flex: 1,
  },
  containerMain : {
    borderRadius : 6,
    backgroundColor : '#fff',
    margin : 20,
    paddingBottom : 20,
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

 class Page extends Component {

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
              水量监测
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

        <View style={[styles.containerMain]}>
        
       
          
            <View>
              <OnePanel></OnePanel>
            </View>

            <View>
              <TwoPanel></TwoPanel>
            </View>

            <View>
              <ThreePanel></ThreePanel>
            </View>

         

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

        <View>
          <FourPanel></FourPanel>
        </View>
        </ScrollView>
        </View>
      );
    }
}


export default Page;