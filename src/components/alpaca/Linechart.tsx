"use client"
import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from "highcharts/highstock";
import { BnOhlc } from '@/model/BnOhlc';
import { alpacaDataService } from '@/service/alpacaDataService';

type LineChartProps = {
    data: any[];
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {

    const [hoverData, setHoverData] = useState(null);
    const [chartOptions, setChartOptions] = useState({});
    const [searchTerm, setSearchTerm] = useState('');





    // split the data set into ohlc and volume
    const ohlc: any = [];
    const volume: any = [];
    const dataLength = data.length
    // set the allowed units for data grouping
    const groupingUnits = [[
        'minute',                         // unit name
        [1]                             // allowed multiples
    ], [
        'week',
        [1, 2, 3, 4, 6]
    ]];

    for (let i = 0; i < dataLength; i += 1) {

        const date = new Date(data[i].t);
        const ticks = date.getTime();
        ohlc.push([
            ticks, // the date
            data[i].o, // open
            data[i].h, // high
            data[i].l, // low
            data[i].c // close
        ]);

        volume.push([
            ticks, // the date
            data[i].vw // the volume
        ]);
    }

    console.log('ohlc:', ohlc);

    const updateSeries = () => {
        setChartOptions({

            chart: {
                height: '60%'
            },

            title: {
                text: 'SPY Historical'
            },
            yAxis: [{
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'OHLC'
                },
                height: '60%',
                lineWidth: 2,
                resize: {
                    enabled: true
                }
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume'
                },
                top: '70%',
                height: '30%',
                offset: 0,
                lineWidth: 2
            }],

            tooltip: {
                split: true
            },
            series: [{
                type: 'candlestick',
                name: 'SPY',
                data: ohlc,
                dataGrouping: {
                    units: groupingUnits
                }
            }, {
                type: 'column',
                name: 'Volume',
                data: volume,
                yAxis: 1,
                dataGrouping: {
                    units: groupingUnits
                }
            }]
        });
    }


    useEffect(() => {
        updateSeries();
    }, []);

    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                constructorType={"stockChart"}
            />
            <h3>Hovering over {hoverData}</h3>

        </>
    )
}

export default LineChart;