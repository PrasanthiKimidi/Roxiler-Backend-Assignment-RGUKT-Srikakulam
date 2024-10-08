import React from 'react';
import './StatisticsCard.css';

const StatisticsCard = ({ statistics, fetchStatistics, setSelectedMonth }) => {
    
    const totalSales = statistics?.totalsales?.[0]?.totalSold || 0; 
    const totalSold = statistics?.totalSoldItems?.[0]?.totalSold || 0; 
    const totalUnsold = statistics?.totalUnsoldItems?.[0]?.totalUnsold || 0; 

    const handleMonthChange = (e) => {  
        const selectedMonth = e.target.value;
        setSelectedMonth(selectedMonth); 
        fetchStatistics(selectedMonth); 
    };


    return (
        
        <div className="statistics-card">
        <div className="month-selector">
                <label>Select Month: </label>
                <input
                    type="month"
                    onChange={handleMonthChange}
                />
            </div>
           <div className="statistics-card-details">
            <h2>Statistics - {statistics.monthName}</h2>
            
            <div className="statistics-item">
                <h3>Total Sales: {totalSales}</h3>
            </div>
            <div className="statistics-item">
                <h3>Total Sold Items: {totalSold}</h3>
            </div>
            <div className="statistics-item">
                <h3>Total Unsold Items: {totalUnsold}</h3>
            </div>
        </div>
        </div>
    );
};

export default StatisticsCard;
