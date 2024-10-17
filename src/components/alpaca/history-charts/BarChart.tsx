"use client"
import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { color } from "highcharts/highstock";
import { BnOhlc } from '@/models/BnOhlc';
import { Position } from '@/models/strategy/position';

type BarChartProps = {
    data: any[];
    position: Position;
};

const BarChart: React.FC<BarChartProps> = (params) => {

    const [chartOptions, setChartOptions] = useState({}); 


    const t1 = new Date(params.position.stampOpened).getTime();
    const t2 = new Date(params.position.stampClosed).getTime();
    //
    console.log('t:', t1 , t2);

    const initialize = () => {
        // split the data set into ohlc and volume
        const ohlc: any = [];
        const volume: any = [];
        const dataLength = params.data.length
        console.log('data:', dataLength);
        // set the allowed units for data grouping
        const groupingUnits = [[
            'minute',                         // unit name
            [1]                             // allowed multiples
        ], [
            'day',
            [1, 2, 3, 4, 6]
        ]];

        for (let i = 0; i < dataLength; i += 1) {

            const date = new Date(params.data[i].t);
            const ticks = date.getTime();
            ohlc.push([
                ticks, // the date
                params.data[i].o, // open
                params.data[i].h, // high
                params.data[i].l, // low
                params.data[i].c // close
            ]);

            volume.push([
                ticks, // the date
                params.data[i].v // the volume
            ]);
        }
        updateSeries(ohlc, volume, groupingUnits);
    }

    const updateSeries = (ohlc: any, volume: any, groupingUnits: any) => {
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
                id: 'dataseries',
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
            },{
                type: 'flags',
                data: [{
                    x: t1,
                    y: params.position.priceOpen,
                    title: 'O',
                    text: 'Position Opened ' + params.position.priceOpen,
                    color: '#0000ff'
                }, {
                    x: t2,
                    y: params.position.priceClose,
                    title: 'C',
                    text: 'Position Closed ' + params.position.priceClose + '<br/>P/L: ' + params.position.profitLoss,
                    color: '#ff0000'
                }],
                // onSeries: 'dataseries',
                shape: 'squarepin',
                borderRadius: 3,
                width: 16
              }]
        });
    }

    useEffect(() => {
        console.log(params)

        if (params.data.length > 0) {
            initialize();
        }

    }, [params, params.data]);


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

export default BarChart;