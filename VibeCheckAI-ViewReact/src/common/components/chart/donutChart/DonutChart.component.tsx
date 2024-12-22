import 'chart.js/auto';
import {ArcElement, Chart, ChartData, ChartOptions, Legend, Tooltip} from 'chart.js';
import React, {FC, ReactElement, useEffect, useRef} from 'react';

Chart.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
    data: ChartData<'doughnut'>;
    options?: ChartOptions<'doughnut'>;
    chartHeight?: number;
    chartWidth?: number;
}

export const DonutChart: FC<DonutChartProps> = (props: DonutChartProps): ReactElement => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            chartInstanceRef.current = new Chart(chartRef.current, {
                type: 'doughnut',
                data: props.data,
                options: props.options,
            });
        }

        return () => {
            chartInstanceRef.current?.destroy();
            chartInstanceRef.current = null;
        };
    }, [props.data, props.options]);

    return <canvas ref={chartRef} width={props.chartWidth ?? "480px"} height={props.chartHeight ?? "480px"}/>;
};
