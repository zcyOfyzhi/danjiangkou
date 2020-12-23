/**
 * Created by dengwei on 2017/8/19.
 */

import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  Dimensions, Keyboard, ImageBackground, BackHandler,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'teaset/components/Toast/Toast';
import PropTypes from 'prop-types';
import {
  SetStatusBar, ButtonView, Paper, Input, TextView,
} from '@rich/react-native-richway-component/index';
import BaseStyle from '../../css/BaseStyle';
import HttpUtils from '../../common/HttpUtils';
import Service from '../../base/Service';
import Logo from '../../image/17.png';
import Background from '../../image/16.png';
import NavigationService from '../../script/NavigationService';
const { width,height } = Dimensions.get('window');
import store from '../../richwayStore';
const styles = StyleSheet.create({
  backgroundView: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height: '100%',
    position: 'absolute',
  },
  bottomImage: {
    width,
    height: height,
    backgroundColor: '#A3CAF1',
    alignItems: 'center',
    paddingTop : '20%'
  },
  accountAndPwdView: {
    height: 36,
    width: width - 90,
    flexDirection: 'row',
    backgroundColor: '#f6f9fe',
    alignItems: 'center',
    borderRadius: 3,
  },
  viewIcon: {
    height: '100%',
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 16,
  },
  accountAndPwdTextInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 14,
  },
  loginBtn: {
    height: 34,
    width: width - 90,
    backgroundColor: '#5da6f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTouch: {
    height: 30,
    width: width - 180,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
  },
  logoView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom : 30
  },
  imageLogo: {
    height: 60,
    
  },
  textLogo: {
    color: BaseStyle.textItemColor,
    fontSize: 10,
    marginLeft: 10,
  },
  positionView: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  titleMain: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleSub: {
    color: 'white',
    fontSize: 10,
  },
});

export default class Login  extends React.Component {
    static propTypes = {
      navigation: PropTypes.object,
      token: PropTypes.object,
    }

    static defaultProps = {
      navigation: {},
      token: {},
    }

    // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {
        loginName: '',
        loginPassword: '',
      };
    }

    // 登录，请求服务器
    login = () => {
      const { loginName, loginPassword } = this.state;
      if (!loginName) {
        Toast.message('手机号码不能为空', 2500);
        return;
      }

      if(loginName.length != 11){
        Toast.message('手机号码长度为11位', 2500);
        return;
      }
      if (loginPassword.length < 6) {
        Toast.message('密码长度不能低于6位', 2500);
        return;
      }

      let params = {
        phone : loginName,
        password : loginPassword
      };

      HttpUtils.get(Service.login,params).then((res) => {
        console.log(res);
        store.token.setToken(res.data.accessToken);
        NavigationService.navigate("ComprehensiveAnalysis", {});
      }).catch((error) => {
        Toast.message(error.message, 2500);
      });
    }

    setData=(obj) => {
      const { token } = this.props;
      AsyncStorage.setItem('user', JSON.stringify(obj)).then(() => {
        token.setUser({
          loginName: obj.loginName,
          loginPassword: obj.loginPassword,
          role: obj.role,
        });
        token.setToken(obj.token);
        this.reset('About');
      });
    }

    reset = (name, params) => {
      const { navigation } = this.props;
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: name, params }),
        ],
        key: null,
      });
        // 在组件中使用dispatch调度路由
      navigation.dispatch(resetAction);
    }


    render() {
      return (
        <View
          style={{ flex: 1 }}
        >
          <ImageBackground
            source={Background}
            style={styles.bottomImage}
          >
            
          <View style={styles.logoView}>
              <Image
                source={Logo}
                style={styles.imageLogo}
                resizeMode="contain"
              />
            </View>

            <TextView style={styles.titleMain}>丹江口水库综合管理平台</TextView>
          </ImageBackground>
         
          <ButtonView
            style={styles.backgroundView}
            activeOpacity={1}
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <Paper style={{ borderRadius: 8 }}>
              <View style={styles.positionView}>
                <View style={styles.accountAndPwdView}>
                  <View style={styles.viewIcon}>
                    <Icon name="md-person" size={18} color="#c8d5e2" />
                  </View>
                  <Input
                    style={styles.accountAndPwdTextInput}
                    clearButtonMode="while-editing"
                    placeholder="输入手机号"
                    keyboardType="numeric"
                    maxLength={11}
                    onChangeText={(text) => {
                      this.setState({
                        loginName: text,
                      });
                    }}
                  />
                </View>

                <View style={[styles.accountAndPwdView, { marginTop: 15 }]}>
                  <View style={styles.viewIcon}>
                    <Icon name="md-unlock" size={18} color="#c8d5e2" />
                  </View>
                  <Input
                    style={styles.accountAndPwdTextInput}
                    clearButtonMode="while-editing"
                    secureTextEntry
                    placeholder="输入登录密码，不少于六位"
                    onChangeText={(text) => {
                      this.setState({
                        loginPassword: text,
                      });
                    }}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.loginBtn, { marginTop: 25, borderRadius: 17 }]}
                  onPress={this.login}
                >
                  <TextView style={styles.btnText}>登 录</TextView>
                </TouchableOpacity>
              </View>
            </Paper>
          </ButtonView>
        </View>
      );
    }
}

