"use client"
import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from "highcharts/highstock";
import { BnOhlc } from '@/models/BnOhlc';

type LineChartProps = {
    data: any[];
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {

    const [chartOptions, setChartOptions] = useState({});

    // split the data set into ohlc and volume
    const ohlc: any = [];
    const volume: any = [];
    const dataLength = data.length
    console.log('data:', data);
    // set the allowed units for data grouping
    const groupingUnits = [[
        'minute',                         // unit name
        [1]                             // allowed multiples
    ], [
        'day',
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
            data[i].v // the volume
        ]);
    }



    const updateSeries = () => {
        setChartOptions({

            chart: {
                height: '600',
                width: '900'
            },

            title: {
                text: 'SPY Historical'
            },
            xAxis: {
                ordinal: true,

            },
            yAxis: [{
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'OHLC'
                },
                height: '90%',
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
                top: '90%',
                height: '10%',
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

    updateSeries();


    return (
        <div className='w-full h-full flex items-center justify-center'>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                constructorType={"stockChart"}
            />
        </div>

    )
}

export default LineChart;