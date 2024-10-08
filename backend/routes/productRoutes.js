const { Router } = require('express');
const { Sequelize, fn, col ,Op,literal} = require('sequelize');
const router = Router();
const products = require('../models/Products'); 
const axios = require('axios');
const Products = require('../models/Products');
const productController=require('../controllers/productControllers');



router.get('/getApiData',productController.getApiData);
router.get('/statistics',productController.getStatistics);


router.get('/barchart',productController.getBarChart);



router.get('/piechart',productController.getPieChart);

router.get('/allcharts',productController.getAllCharts);

router.get('/getAllTransaction',productController.getAllTransactions)

module.exports = router;
