import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import './BarChart.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ chartData, fetchChartData, setSelectedMonth }) => {

    const handleMonthChange = (e) => {
        const selectedMonth = e.target.value;
        setSelectedMonth(selectedMonth); 
        fetchChartData(selectedMonth);
    };



    const data = {
        labels: chartData.data.map(item => item.priceRange),
        datasets: [
            {
                label: 'Item Count',
                data: chartData.data.map(item => item.itemCount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="bar-chart-container" >
            <div className="bar-chart-header">
            
                <h2>Bar Chart - {chartData.month} </h2>
                {}
                <div className="month-selector">
                    <label>Select Month: </label>
                    <input
                        type="month"
                        onChange={handleMonthChange}
                    />
                </div>
            </div>
            
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
