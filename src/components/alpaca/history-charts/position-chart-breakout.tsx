"use client"
import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { color } from "highcharts/highstock";
import { PositionModel } from '@/models/strategy/position-model';
import { SideEnum } from '@/models/strategy/enums';

type PositionChartProps = {
    data: any[];
    positions: PositionModel[];
};

interface PositionBreakouts {
    PrevLow: number;
    PrevHigh: number;
    PrevLowStamp: number;
    PrevHighStamp: number;
}

const PositionChartBreakout: React.FC<PositionChartProps> = (params) => {

    const [chartOptions, setChartOptions] = useState({});


    const times: number[] = [];
    const positionBreakouts: PositionBreakouts[] = [];
    params.positions.forEach((pos) => {
        times.push(new Date(pos.stampOpened).getTime());
        times.push(new Date(pos.stampClosed).getTime());

        var breakoutParams = JSON.parse(pos.strategyParams);
        const preLowStamp = new Date(breakoutParams.PrevLowStamp).getTime();
        const preHighStamp = new Date(breakoutParams.PrevHighStamp).getTime();
        const prevLow = breakoutParams.PrevLow;
        const prevHigh = breakoutParams.PrevHigh;
        positionBreakouts.push({ PrevLow: prevLow, PrevHigh: prevHigh, PrevLowStamp: preLowStamp, PrevHighStamp: preHighStamp });

    })

    const positionFlags = params.positions.map((pos, index) => {
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


    const updateSeries = (ohlc: any, volume: any,  positionFlags:any, breakoutFlags : any) => {
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
              
            }, {
                type: 'column',
                name: 'Volume',
                data: volume,
                yAxis: 1,
         
            }].concat(positionFlags).concat(breakoutFlags)
        });
    }

    useEffect(() => {
        
    const breakoutFlags = params.positions.map((pos, index) => {
        return {
            type: 'flags',
            data: [{
                x: positionBreakouts[index].PrevLowStamp,
                y: positionBreakouts[index].PrevLow,
                title: 'L',
                text: 'Previous Low' + positionBreakouts[index].PrevLow,
                color: '#0000ff'
            }, {
                x: positionBreakouts[index].PrevHighStamp,
                y: positionBreakouts[index].PrevHigh,
                title: 'H',
                text: 'Previous High ' + positionBreakouts[index].PrevHigh,
                color: '#ff0000'
            }],
            // onSeries: 'dataseries',
            shape: 'squarepin',
            borderRadius: 3,
            width: 16
        };
    });  
        const initialize = () => {
            // split the data set into ohlc and volume
            const ohlc: any = [];
            const volume: any = [];
            const dataLength = params.data.length
            console.log('data:', dataLength);
            // set the allowed units for data grouping
          
    
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
            updateSeries(ohlc, volume, positionFlags, breakoutFlags);
        }
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

export default PositionChartBreakout;