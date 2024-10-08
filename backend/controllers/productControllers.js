const { Router } = require('express');
const { Sequelize, fn, col ,Op,literal} = require('sequelize');
const router = Router();
const products = require('../models/Products'); 
const axios = require('axios');
const Products = require('../models/Products');
const services=require('../services/productServices');
const common=require('../helpers/common')


exports.getApiData=async(req,res)=>{
    try{
    const {data} = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
    console.log(data);
    await products.bulkCreate(data)
    res.json({
        message:"Data fetched and inserted successfully",
        data:data
    });
    }
    catch(error){
        console.log(error)
    }
}

exports.getStatistics=async (req, res) => {
    try {
        const now = new Date();
        const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0');
        let month = req.query.month==='undefined' ?currentMonth:req.query.month;


        let monthName=await common.getMonthName(month);
        console.log(monthName)
        

        if (!month || isNaN(month) || month < 1 || month > 12) {
            return res.status(400).json({ message: "Invalid or missing month parameter" });
        }

        month = parseInt(month, 10);
        const totalsales =await services.getSalesSum(1,'totalSold',month)
        const totalSoldItems = await services.getStatistics(1,'totalSold',month);
        const totalUnsoldItems = await services.getStatistics(0,'totalUnsold',month);

        console.log(totalSoldItems);
        console.log(totalUnsoldItems);


        res.json({totalsales,totalSoldItems,totalUnsoldItems,monthName:monthName});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



exports.getBarChart=async (req, res) => {
    const now = new Date();
    const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0');
    const month = req.query.month==='undefined' ?currentMonth:req.query.month;

    let monthName=await common.getMonthName(month);
        console.log(monthName)

    if (!month || isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({ error: "A valid month (1-12) is required" });
    }

    try {

        const priceRanges = [
            { range: '0-100', min: 0, max: 100 },
            { range: '101-200', min: 101, max: 200 },
            { range: '201-300', min: 201, max: 300 },
            { range: '301-400', min: 301, max: 400 },
            { range: '401-500', min: 401, max: 500 },
            { range: '501-600', min: 501, max: 600 },
            { range: '601-700', min: 601, max: 700 },
            { range: '701-800', min: 701, max: 800 },
            { range: '801-900', min: 801, max: 900 },
            { range: '901-above', min: 901, max: null } 
        ];

       
        const data =await services.getBarChartInfo(month);

      
        const result = priceRanges.map(range => {
            const matchedData = data.find(item => item.priceRange === range.range);
            return {
                priceRange: range.range,
                itemCount: matchedData ? parseInt(matchedData.itemCount, 10) : 0 
            };
        });

        res.json({data,month:monthName});

    } catch (error) {
        console.error('Error fetching data for bar chart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.getPieChart=async (req, res) => {
    const now = new Date();
    const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0');
    const month = req.query.month==='undefined' ?currentMonth:req.query.month;


    if (!month || isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({ error: "A valid month (1-12) is required" });
    }

    try {
        const data =await services.getPieChartInfo(month);
        const result = data.map(item => ({
            category: item.category,
            itemCount: parseInt(item.itemCount, 10)
        }));

        res.json(result);

    } catch (error) {
        console.error('Error fetching data for pie chart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getAllCharts=async (req, res) => {
    const month = req.query.month;

    if (!month || isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({ error: "A valid month (1-12) is required" });
    }

    try {

        const [statistics, barchart, piechart] = await Promise.all([
            axios.get(`http://localhost:4000/statistics?month=${month}`),
            axios.get(`http://localhost:4000/barchart?month=${month}`),
            axios.get(`http://localhost:4000/piechart?month=${month}`)
        ]);

        res.json({
            statistics: statistics.data,
            barchart: barchart.data,
            piechart: piechart.data
        });

    } catch (error) {
        console.error('Error fetching data for all charts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.getAllTransactions=async (req,res)=>{
    try{
        console.log("hello");
        const page=req.query.page||1;
        const pageSize=+req.query.pageSize || 10;
        let month=req.query.month;

        let filter=month?Sequelize.where(fn('MONTH', col('dateOfSale')), month):{};
        
        let offset=pageSize*(page-1);

        const { rows: transactions, count } = await Products.findAndCountAll({
            where: filter,
            limit: pageSize,
            offset: +offset
        });
        
        console.log(transactions);
        res.send({transactions,count});
    }
    catch(error)
    {
        res.send(error);
    }
}

