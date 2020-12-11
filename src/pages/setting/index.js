import React, { Component } from 'react';
import {
  View, 
  StyleSheet, 
  AsyncStorage,
  Image,
  Dimensions,
  StatusBar,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import { TextView, Dialog, ButtonView } from '@rich/react-native-richway-component';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseStyle from '../../css/BaseStyle';
import Icon1 from '../../image/18.png';
import TitleBar from "../../components/TitleBar";
import SlideMenu from '../../common/slideMenu';
import { SlideModal } from 'beeshell';
const window = Dimensions.get('window');
const screenHeight =  window.height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: BaseStyle.backgroundColor,
    flex : 1,
  },
  headerBg: {
    height: 110,
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#3385FF',
    paddingHorizontal: 10,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 90,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 30,
    height: 55,
  },
  name: {
    color: BaseStyle.title,
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon1: {
    width: 24,
    height : 24,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize :18,
    marginRight : 6,
  },
  about : {
    borderRadius : 6,
    backgroundColor : '#fff',
    margin : 20
  },
  aboutHeader : {
    display : 'flex',
    flexDirection : 'row',
    padding : 10,
  },
  aboutText  : {
    paddingLeft : 15,
    paddingRight : 15,
    lineHeight : 22,
    fontSize : 14
  },
  top: {
    flex: 1
  },
  bottom: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    height: 38,
    borderRadius: 6,
    fontSize : 16,
    backgroundColor: BaseStyle.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
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
              设置
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


  static propTypes = {
      navigation: PropTypes.object,
      token: PropTypes.object,
    }

    static defaultProps = {
      navigation: {},
      token: {},
    }


    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      const { navigation } = this.props;
      navigation.setParams({ onPress: this.handleHeaderOnPress});
    }
  
    handleHeaderOnPress = () => {
      this._slideModal.open();
    }

    reset=() => {
      Dialog.open({
        text: '是否注销登录？',
        ok: () => {
          AsyncStorage.removeItem('user');
          this.resetPage('Login');
        },
      });
    }

    resetPage = (name) => {
      
    }

    openAbout=() => {
      const { navigation } = this.props;
      navigation.navigate('About');
    }

    _setName = () => {
      this._slideModal.close();
    }
  

    render() {
      const { token } = this.props;
      return (
        <View style={styles.container}>
          
          <View style={styles.top}>

            <View style={styles.headerBg}>
            <View style={styles.icon}>
              <Icon name="ios-person" size={45} color="#3385FF" />
            </View>
            <View style={styles.message}>
              <TextView style={styles.name}>cmc</TextView>
            </View>
          </View>
          
          <View  style={styles.about}>
              <View style={styles.aboutHeader}>
                  <Image
                    source={Icon1}
                    style={styles.icon1}
                  />
                  <TextView style={{fontSize : 14}}>关于我们</TextView>
              </View>
              <TextView style={styles.aboutText}>本软件由专业水利工程开发，目前发布版本为V1.0.0公测版，计算和查询功能仍在不断的完善，如果您有更好的建议请通过意见反馈告诉我们。</TextView>
          </View>
          </View>
          
          <View style={styles.bottom}>
            <ButtonView style={styles.button} onPress={this.reset}>
              <TextView style={{ color: 'white' }}>注销</TextView>
            </ButtonView>
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
      );
    }
}

export default Page;
