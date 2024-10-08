import React, { useState } from 'react';
import './App.css';
import BarChart from './Components/BarChart';
import StatisticsCard from './Components/StatisticsCard';
import Table from './Components/Table';

const App = () => {
    const getCurrentMonth = () => {
        const date = new Date();
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    };

    const [month, setMonth] = useState(getCurrentMonth()); 
    const [productData, setProductData] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeComponent, setActiveComponent] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(month); 

    const fetchProductData = (pageNumber,monthToUse="") => {
        setLoading(true);
        const monthParam = monthToUse!=""?monthToUse.split('-')[1]:selectedMonth.split('-')[1]; 

        fetch(`http://localhost:4000/getAllTransaction?month=${monthParam}&page=${pageNumber}`)
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then((data) => {
                setProductData(data);
                setActiveComponent('table');
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
                setLoading(false);
            });
    };

    const fetchChartData = (monthToUse) => {
        setLoading(true);
        const monthParam = monthToUse.split('-')[1];

        fetch(`http://localhost:4000/barchart?month=${monthParam}`)
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then((data) => {
                setChartData(data);
                setActiveComponent('chart');
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching chart data:', error);
                setLoading(false);
            });
    };

    const fetchStatistics = (monthToUse) => {
        setLoading(true);
        const monthParam = monthToUse.split('-')[1]; 

        fetch(`http://localhost:4000/statistics?month=${monthParam}`)
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then((data) => {
                setStatistics(data);
                setActiveComponent('statistics');
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching statistics:', error);
                setLoading(false);
            });
    };


    return (
        <div className="app-container">
            <h1 className="app-title">Data Dashboard</h1>

            
            {}
            <div className="button-group">
                <button className="custom-button" onClick={()=>fetchProductData(1,selectedMonth)}>Fetch Product Data</button>
                <button className="custom-button" onClick={() => fetchChartData(selectedMonth)}>Fetch Bar Chart Data</button>
                <button className="custom-button" onClick={()=>fetchStatistics(selectedMonth)}>Fetch Statistics</button>
            </div>

            {}
            {loading && <div className="loader">Loading...</div>}

            {}
            {activeComponent === 'table' && productData && !loading ? (
                <Table data={productData} fetchProductData={fetchProductData} setSelectedMonth={setSelectedMonth} />
            ) : activeComponent === 'chart' && chartData && !loading ? (
                <BarChart chartData={chartData} fetchChartData={fetchChartData} setSelectedMonth={setSelectedMonth} />
            ) : activeComponent === 'statistics' && statistics && !loading ? (
                <StatisticsCard statistics={statistics} fetchStatistics={fetchStatistics} setSelectedMonth={setSelectedMonth}  />
            ) : (
                !loading && <p>No data available. Select a month and click the button to load.</p>
            )}
        </div>
    );
};

export default App;
