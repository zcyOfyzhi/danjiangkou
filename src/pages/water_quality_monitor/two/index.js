import React, {Component} from 'react';
import {
    View, StyleSheet, FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { ButtonView, TextView } from '@rich/react-native-richway-component/index';
import moment from 'moment';
import BaseStyle from '../../../css/BaseStyle';

const styles = StyleSheet.create({
    container: {
        borderRadius : 6,
        backgroundColor : '#fff',
        margin : 20,
        paddingBottom : 20,
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
        alignItems: `center`
    },
    empty: {
        borderRightWidth: 1,
        justifyContent: `center`,
        alignItems: `center`
    }
});

class Page extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        data: PropTypes.array
    }
    static defaultProps = {
        data: [
            {
                id : 1,
                stnm : '站点1',
                cLevel : 'III类',
                tm : '2020.4.16 18:46',
                tLevel : 'I类'
            },
            {
                id : 2,
                stnm : '站点2',
                cLevel : 'III类',
                tm : '2020.4.16 18:46',
                tLevel : 'I类'
            },
            {
                id : 3,
                stnm : '站点3',
                cLevel : 'III类',
                tm : '2020.4.16 18:46',
                tLevel : 'I类'
            },
            {
                id : 4,
                stnm : '站点4',
                cLevel : 'III类',
                tm : '2020.4.16 18:46',
                tLevel : 'I类'
            }
        ],
        navigation: {},
    }

    state = {
        title: {
            stnm: `站名`,
            cLevel: `当前水质`,
            tm: `时间`,
            tLevel: `目标水质`
        }
    }

    componentWillReceiveProps(nextProps) {
        const {data} = nextProps;
        this.setState({
            data
        });
    }

    renderItem = ({item}) => {
        const element = this.setItem(item,false);
        return element;
    }

  

    setItem = (item,isHeader) => {
        const { navigation } = this.props;
       
        let arr = [];
        arr.push(
           <View style={[styles.border,{backgroundColor : isHeader ? '#F7F7F7' : '#fff'}]}>
                <ButtonView
                    style={styles.sitem}
                    key={item.id}
                    onPress={() => {
                         
                    }}
                >
                    <View style={styles.item}>
                        <TextView><TextView>{item.stnm}</TextView></TextView>
                    </View>

                    <View style={styles.item}>
                        <TextView>{item.cLevel}</TextView>
                    </View>
                    
                    <View style={styles.itemTm}>
                        <TextView>{item.tm}</TextView>
                    </View>

                    <View style={styles.item}>
                        <TextView>{item.tLevel}</TextView>
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
                <TextView style={styles.BgTitle}>水质站</TextView>
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

export default withNavigation(Page);
