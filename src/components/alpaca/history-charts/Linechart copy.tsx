"use client"
import React, { useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from "highcharts/highstock";
import { BnOhlc } from '@/model/BnOhlc';

type LineChartProps = {
    data: BnOhlc[];
  };

  const LineChart: React.FC<LineChartProps> = ({ data }) => {
    const [hoverData, setHoverData] = useState(null);
    const [chartOptions, setChartOptions] = useState({
        
        xAxis: {
            categories: ['A', 'B', 'C'],
        },
        series: [
            { data: [1, 2, 3] }
        ],
        plotOptions: {
            series: {
                point: {
                    events: {
                        mouseOver(e: any) {
                            setHoverData(e.target.category)
                        }
                    }
                }
            }
        }
    });

    const updateSeries = () => {
        setChartOptions({
            xAxis: {
                categories: ['A', 'B', 'C'],
            },
            series: [
                { data: [Math.random() * 5, 2, 1] }
            ],
            plotOptions: {
                series: {
                    point: {
                        events: {
                            mouseOver(e) {
                                setHoverData(e.target.category)
                            }
                        }
                    }
                }
            }
        });
    }

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                constructorType={"stockChart"}
            />
            <h3>Hovering over {hoverData}</h3>
            <button onClick={updateSeries}>Update Series</button>
        </div>
    )
}

export default LineChart;