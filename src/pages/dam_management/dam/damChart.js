import React, { Component } from 'react';
import {
    StyleSheet, processColor, View
} from 'react-native';
import PropTypes from 'prop-types';
import Echarts from 'native-echarts';
import { TextView } from '@rich/react-native-richway-component';

const styles = StyleSheet.create({
    chart: {
        height: '100%',
        width : '100%',
    },
    container: {
        paddingVertical: 10,
        justifyContent: `space-between`,
        alignItems: `center`
    },
    legend: {
        flexDirection: `row`
    },
    legendItem: {
        flexDirection: `row`,
        alignItems: `center`,
        marginRight: 5
    },
    icon: {
        width: 18,
        height: 12,
        borderRadius: 5,
        marginRight: 3
    },
    text: {
        fontSize: 10
    }
});

class Page extends Component {
    static propTypes = {
        dataList :PropTypes.array
      }
    
    static defaultProps = {
        dataList : []
    }

    constructor(props) {
        super(props);
        this.state = {
            chartOption : {}
        };
    }

    componentWillReceiveProps(nextProps) {
        const {dataList} = nextProps;
        this.initChartOption(dataList);
    }
    
   

    initChartOption = (arr) => {
        let dataList = [];
        let total = 0;
        
        arr.forEach(item => {
            dataList.push({
                name : item.name,
                value : item.total
            });

            total += item.total;
        });

        let title = '总设备';

        let option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            title: [{
                text : `${title} : ${total}`,
                textAlign: 'center',
                top: '35%',
                left: '48%',
                textStyle : {
                    fontWeight: 'normal',
                    fontSize : 14
                }
            }],
            series: [{
                name: '设备比例图',
                type: 'pie',
                color: ['#007DFF', '#9446E7', '#EF3737', '#FFAF2A', '#AE1616', '#DCD535', '#4BD754', '#1FC4D4', '#3539DF'],
                radius: ['40%', '70%'],
                center: ['50%', '40%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                      formatter: '{b}:{c}',
                      show: false
                    },
                },
                labelLine: {
                    normal: {
                      length : 2,
                      length : 3,
                      show: false
                    }
                },
                data: dataList
            }]
        };

        this.setState({
            chartOption : option
        });
    }

    

    

    render() {
        const { chartOption } = this.state;
        return (
            <View style={styles.container}>
                <Echarts option={chartOption}  height={260} />
            </View>
             
        );
    }
}

export default Page;
