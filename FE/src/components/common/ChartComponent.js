import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

function ChartComponent(props) {
    const { timeData, tempData, humidityData, rainData } = props
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create the chart
        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeData,
                datasets: [
                    {
                        label: 'Temp (Cº)',
                        data: tempData,
                        borderColor: 'red',
                        fill: false,
                        yAxisID: 'temp-y-axis'
                    },
                    {
                        label: 'Humidity (%)',
                        data: humidityData,
                        borderColor: 'yellow',
                        fill: false,
                        yAxisID: 'humidity-y-axis'
                    },
                    {
                        label: 'Rain (m)',
                        data: rainData,
                        borderColor: 'blue',
                        fill: false,
                        yAxisID: 'rain-y-axis'
                    },
                ]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            tooltipFormat: 'dd/MM/yyyy HH:mm',
                            unit: 'day',
                            displayFormats: {
                                day: 'dd/MM/yyyy HH:mm',
                            },
                            stepSize: 1
                        },
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    },
                    yAxes: [
                        {
                            id: 'temp-y-axis',
                            type: 'linear',
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Temp (Cº)'
                            }
                        },
                        {
                            id: 'humidity-y-axis',
                            type: 'linear',
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Humidity (%)'
                            }
                        },
                        {
                            id: 'rain-y-axis',
                            type: 'linear',
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Rain (m)'
                            }
                        },
                    ],
                }
            }
        });
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [humidityData, rainData, tempData, timeData]);

    return (
        <canvas className="flex justify-center items-center" ref={chartRef} />
    );
}

export default ChartComponent;
