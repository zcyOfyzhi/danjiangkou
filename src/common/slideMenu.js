import React, { Component } from 'react';
import {
  View,
  Platform,
  StyleSheet,
  NativeModules,
  Image,
  Dimensions
} from 'react-native';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonView, TextView } from '@rich/react-native-richway-component';
import BaseStyle from '../css/BaseStyle';
import IconOne from '../image/8.png';
import Icon1 from '../image/9.png';
import Icon2 from '../image/10.png';
import Icon3 from '../image/11.png';
import Icon4 from '../image/12.png';
import Icon5 from '../image/13.png';

const window = Dimensions.get('window');
const screenWidth = window.width;
const screenHeight = window.height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: screenWidth - 150,
    height: screenHeight
  },
  top: {
    marginBottom: '5%',
  },
  topText: {
    padding: 10,
    fontSize: 18,
    color: '#333'
  },
  icon: {
    width: 16,
    height: 16,
    marginLeft: 20,
    marginRight: 5,

  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '8%',
    
  },
  titleText: {
    color: '#3385FF'
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 42,
    paddingRight: 20,
    marginBottom: '10%',
  },
  menuText: {
    fontSize: 14,
    color: '#333'
  },
  info: {
    marginBottom: 0,
  }
});

class Page extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  static defaultProps = {
    navigation: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      dataList: [
        {
          label: '信息总览',
          icon: Icon1,
          children: [
            {
              label: '信息总览',
              routeName: 'ComprehensiveAnalysis',
            }
          ]
        },
        {
          label: '供水管理',
          icon: Icon2,
          children: [
            {
              label: '水量监测',
              routeName: 'WaterNumMonitor',
            },
            {
              label: '水质监测',
              routeName: 'WaterQualityMonitor',
            }
          ]
        },
        {
          label: '库区管理',
          icon: Icon3,
          children: [
            {
              label: '库区总览',
              routeName: 'ReservoirOverview'
            },
            {
              label: '我的巡检'
            }
          ]
        },
        {
          label: '坝区管理',
          icon: Icon4,
          children: [
            {
              label: '坝区管理',
              routeName: 'DamManagement'
            }
          ]
        },
        {
          label: '我的',
          icon: Icon5,
          children: [
            {
              label: '设置',
              routeName: 'Setting'
            }
          ]
        }
      ]
    }
  }


  componentDidMount() {
    const { navigation } = this.props;
  }





  render() {
    const { dataList } = this.state;
    const { navigation } = this.props;
    const _this = this;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TextView style={styles.topText}>目录</TextView>
        </View>

        {
          dataList.map(function (item, index) {
            return (
              <View style={styles.info}>
                <View style={styles.title} key={`menu_${index}`}>
                  <Image source={item.icon} style={styles.icon} />
                  <TextView style={styles.titleText}>{item.label}</TextView>
                </View>
                {
                  item.children.map(function (sitem, sindex) {
                    return (
                      <ButtonView
                        key={`smenu_${sindex}`}
                        onPress={() => {
                          if(sitem.routeName){
                            console.log(sitem.routeName);
                            _this.props.navigate(sitem.routeName);
                            _this.props._setName();
                          }
                        }}
                      >
                        <View style={styles.menu}>
                          <TextView style={styles.menuText}>{sitem.label}</TextView>
                          <Icon
                            name={'ios-arrow-forward'}
                            size={18}
                            color={'#ccc'}
                          />
                        </View>
                      </ButtonView>
                    );
                  })
                }
              </View>
            );
          }
          )
        }

      </View>
    );
  }
}

export default Page;
