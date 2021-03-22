import React, { Component } from 'react';
import {
    StyleSheet, processColor, View
} from 'react-native';
import PropTypes from 'prop-types';
import { TextView } from '@rich/react-native-richway-component';
import Echarts from 'native-echarts';

const styles = StyleSheet.create({
    chart: {
        height: 100,
        width: '100%'
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
        dzList :PropTypes.array
      }
    
    static defaultProps = {
    dzList : []
    }

    constructor(props) {
        super(props);
        this.state = {
            chartOption : {},
            dataArr : [],
            total : 0
        };
    }

    componentWillReceiveProps(nextProps) {
        const {dzList} = nextProps;
        this.initChartOption(dzList);
    }
    
    componentDidMount() {
    }

    initChartOption = (arr) => {
        let list = [];
        let num = 0;

        arr.forEach((item,index) => {
            num += item.total;
            list.push({
                value: item.total,
                name: item.name
            });
        });

        this.setState({
            dataArr : list,
            total : num
        })

    }

    
   
    render() {
        const { dataArr,total } = this.state;
        const option = {
            tooltip: {
                trigger: 'item',
                confine: false,
                position : [10,10],
                formatter: '{b}：<br/>{c}次'
            },
            series: [{
                name: '地震比例图',
                type: 'pie',
                color: ['#409EFF', '#33FFD1', '#F8E71C','#EB1954'],
                radius: ['50%', '80%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                },
                labelLine: {
                    normal: {
                      show: false
                    }
                },
                data: dataArr
            }]
          };
        return (
          <View style={styles.container}>
            <Echarts option={option}  height={100} />
               
        </View>
             
        );
    }
}

export default Page;
