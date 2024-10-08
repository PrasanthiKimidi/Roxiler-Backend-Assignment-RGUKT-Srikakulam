import React, { useState } from 'react';
import './Table.css';

const Table = ({ data ,fetchProductData, setSelectedMonth }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalRows=data.count;
    const rowsPerPage=10;

    const handleMonthChange = (e) => {
        const selectedMonth = e.target.value;
        setSelectedDate(selectedMonth);
        setSelectedMonth(selectedMonth);
        fetchProductData(1,selectedMonth);
    };


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);  
        fetchProductData(pageNumber); 
    };



    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


    const filteredData = data.transactions.filter(item => {
        const matchesSearch =
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.price.toString().includes(searchTerm.toLowerCase()); 
    
        
    
        return matchesSearch;
    });

        
    let formattedMonth = filteredData[0]
    ? new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(filteredData[0].dateOfSale))
    : 'All Products';
    return (
        <div className="table-container">
            <h2 className="table-title">Product Table -{formattedMonth} </h2>
            <div className="table-controls">
                {}
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                
                {}
                <input
                    type="month"
                    
                    onChange={handleMonthChange}
                    className="date-selector"
                />
            </div>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Sold</th>
                        <th>Date of Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => {
                            const price = typeof item.price === 'number' ? item.price : parseFloat(item.price);
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>${isNaN(price) ? 'N/A' : price.toFixed(2)}</td>
                                    <td>{item.description}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <img src={item.image} alt={item.title} width="50" height="50" className="product-image" />
                                    </td>
                                    <td>{item.sold ? 'Yes' : 'No'}</td>
                                    <td>{new Date(item.dateOfSale).toLocaleDateString()}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="8">No matching records found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {}
            <div className="pagination">
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`page-button ${currentPage === number ? 'active' : ''}`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Table;
