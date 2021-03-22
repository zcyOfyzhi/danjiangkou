import React, { Component } from 'react';
import {
    StyleSheet, processColor, View
} from 'react-native';
import PropTypes from 'prop-types';
import Echarts from 'native-echarts';

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
        arr.forEach((item) => {
            dataList.push({
                name : item.fishName,
                value : item.fishTotal
            });
        });
        
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            series: [{
                name: '鱼类增殖统计',
                type: 'pie',
                color: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16','#E8684A', '#6DC8EC', '#9270CA', '#FF9D4D','#269A99','#FF99C3','#5B8FF9','#BDD2FD'],
                radius: ['40%', '60%'],
                center: ['50%', '40%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                      formatter: '{b}:{c}',
                      show: true
                    },
                },
                labelLine: {
                    normal: {
                      length : 2,
                      length : 3,
                      show: true
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
            <Echarts option={chartOption}  height={320} />   
        </View>
             
        );
    }
}

export default Page;
