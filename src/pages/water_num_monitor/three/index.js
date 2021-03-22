import React, {Component} from 'react';
import {
    View, 
    StyleSheet, 
    FlatList,
    DeviceEventEmitter
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { ButtonView, TextView } from '@rich/react-native-richway-component/index';
import moment from 'moment';
import BaseStyle from '../../../css/BaseStyle';

const styles = StyleSheet.create({
    container: {
        
        marginTop : 20,
    },
    BgTitle : {
        fontSize : 20,
        color : '#141F2E',
        margin : 20
      },
    border: {
        borderColor: `#F5F5F5`,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        height: 35,
        flexDirection: `row`
    },
    item: {
        height: `100%`,
        flex: 1,
        borderColor: `#F5F5F5`,
        borderRightWidth: 1,
        justifyContent: `center`,
        alignItems: `center`
    },
    sitem: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
      },
    itemTm: {
        height: `100%`,
        width : '30%',
        borderColor: `#F5F5F5`,
        borderRightWidth: 1,
        justifyContent: `center`,
        alignItems: `center`,
    },
    empty: {
        borderRightWidth: 1,
        justifyContent: `center`,
        alignItems: `center`
    }
});

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            title: {
                tm: `时间`,
                flow: `日平均流量（m³/s）`,
                amount: `日供水量（百万m³）`,
                upZ: `闸前水位`,
                downZ: `闸后水位`
            }
        }
    }

    componentDidMount(){
        this.listener = DeviceEventEmitter.addListener('waterNumData', (data) => {
            this.setState({
               data : data.zhglWatersupAdjustedFlows
           });
        });
      }
    
      componentWillUnmount(){
        this.listener.remove();
      }

    renderItem = ({item}) => {
        const element = this.setItem(item,false);
        return element;
    }

    formatTm = (tm,isHeader) =>{
        if(isHeader){
            return tm
        }
        return moment(tm).format('MM月DD日');
    }

    formatNumber = (str,isHeader) => {
        if(isHeader){
            return str;
        }
        if(!str){
          return '--';
        }
        return Number(str).toFixed(2);
    }

    setItem = (item,isHeader) => {
        let arr = [];
        arr.push(
           <View style={[styles.border,{backgroundColor : isHeader ? '#F7F7F7' : '#fff',height : isHeader ? 55 : 35}]}>
                <ButtonView
                    style={[styles.sitem,{height : isHeader ? 50 : 30}]}
                    key={item.id}
                    onPress={() => {
                         
                    }}
                >
                    <View style={styles.item}>
                        <TextView><TextView>{this.formatTm(item.tm,isHeader)}</TextView></TextView>
                    </View>

                    <View style={styles.item}>
                        <TextView>{this.formatNumber(item.flow,isHeader)}</TextView>
                    </View>
                    
                    <View style={styles.item}>
                        <TextView>{this.formatNumber(item.amount,isHeader)}</TextView>
                    </View>

                    <View style={styles.item}>
                        <TextView>{this.formatNumber(item.upZ,isHeader)}</TextView>
                    </View>

                    <View style={styles.item}>
                        <TextView>{this.formatNumber(item.downZ,isHeader)}</TextView>
                    </View>
                </ButtonView>
            </View>
        );

        return arr;
        
    }

    ListEmptyComponent = () => (
        <View style={[styles.border, styles.empty]}>
        <TextView>暂无数据</TextView>
      </View>
    )

    render() {
        const {title, data} = this.state;
        return (
            <View style={styles.container}>
                <View style={{paddingLeft : 15,paddingRight : 15,}}>
                    {this.setItem(title,true)}
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                        ListEmptyComponent={this.ListEmptyComponent}
                   />
                </View>
          </View>
        );
    }
}
