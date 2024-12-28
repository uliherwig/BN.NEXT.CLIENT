"use client"
import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { color } from "highcharts/highstock";
import { BnOhlc } from '@/models/BnOhlc';
import { Position } from '@/models/strategy/position';
import { SideEnum } from '@/models/strategy/enums';
import CircularLoader from '@/components/common/loader';

type PositionChartProps = {
    data: any[];
    positions: Position[];
};

const PositionChartSMA: React.FC<PositionChartProps> = (params) => {

    const [chartOptions, setChartOptions] = useState({});
    const [loading, setLoading] = useState(true);

    const short: [number, number][] = [];
    const long: [number, number][] = [];
    const ohlc: [number, number, number, number, number][] = [];

    const times: number[] = [];
    params.positions.forEach((pos) => {
        times.push(new Date(pos.stampOpened).getTime());
        times.push(new Date(pos.stampClosed).getTime());
    })


    const smaParams = JSON.parse(params.positions[0].strategyParams);

    const flagsData = params.positions.map((pos, index) => {
        return {
            id: 'position' + index,
            type: 'flags',
            data: [{
                x: times[index * 2],
                y: pos.priceOpen,
                title: 'O',
                text: `${SideEnum[pos.side]} ${pos.priceOpen}`,
                color: '#0000ff'
            }, {
                x: times[index * 2 + 1],
                y: pos.priceClose,
                title: 'C',
                text: `Closed ${pos.priceClose}` + '<br/>P/L: ' + pos.profitLoss,
                color: '#ff0000'
            }],
            shape: 'squarepin',
            borderRadius: 3,
            width: 16
        };
    });

    const initialize = async () => {
        const volume: any = [];
        const dataLength = params.data.length
        console.log('data:', dataLength);

        // set the allowed units for data grouping
        const groupingUnits = [[
            'minute',                         // unit name
            [1]                             // allowed multiples
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

            if (ohlc.length >= smaParams.LongPeriod) {
                const shorties = ohlc.slice(smaParams.ShortPeriod * -1);
                const shortAvg = shorties.map(item => item[4]).reduce((a, b) => a + b, 0) / smaParams.ShortPeriod;

                short.push([
                    ticks,
                    shortAvg
                ]);

                const longies = ohlc.slice(smaParams.LongPeriod * -1);
                const longAvg = longies.map(item => item[4]).reduce((a, b) => a + b, 0) / smaParams.LongPeriod;

                long.push([
                    ticks,
                    longAvg
                ]);
            }

            volume.push([
                ticks, // the date
                params.data[i].v // the volume
            ]);
        }

        await updateSeries(ohlc, short, long, volume, groupingUnits, flagsData);
    }

    const updateSeries = async (ohlc: any, short: any, long: any, volume: any, groupingUnits: any, flagsData: any) => {
        setChartOptions({

            chart: {
                height: '600',
                width: '900'
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
            },
            {
                id: 'short',
                name: 'Short Period',
                data: short
            },
            {
                id: 'long',
                name: 'Long Period',
                data: long
            },
            {
                type: 'column',
                name: 'Volume',
                data: volume,
                yAxis: 1,
                dataGrouping: {
                    units: groupingUnits
                }
            },

            ].concat(flagsData)
        });

    }

    useEffect(() => {

        if (params.data.length > 0) {
            initialize();
            setLoading(false);
        }

    }, [params, params.data]);


    return (
        <div className='w-full h-full flex items-center justify-center'>
            {loading ? (
                <CircularLoader />
            ) : (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                    constructorType={"stockChart"}
                />
            )}
        </div>

    )
}

export default PositionChartSMA;