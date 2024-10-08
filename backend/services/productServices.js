const productModel=require('../models/Products');
const { Sequelize, fn, col ,Op,literal} = require('sequelize');

exports.getStatistics=async(sold,attribute,month)=>{
    try{
       const data= await productModel.findAll({
            attributes: [
                [fn('COUNT',col('id')),attribute]
            ],
            where:{
                sold:sold,
                [Op.and]:[
                    Sequelize.where(fn('MONTH',col('dateOfSale')),month)
                ]
            }
        })

        // console.log(data);


        return data;
    }
    catch(error)
    {
        throw new Error(error);
    }
}

exports.getSalesSum=async(sold,attribute,month)=>{
    try{
       const data= await productModel.findAll({
            attributes: [
                [fn('SUM',col('price')),attribute]
            ],
            where:{
                sold:sold,
                [Op.and]:[
                    Sequelize.where(fn('MONTH',col('dateOfSale')),month)
                ]
            }
        })


        return data;
    }
    catch(error)
    {
        throw new Error(error);
    }
}


exports.getBarChartInfo=async (month)=>{
    try{
        const data=await productModel.findAll({
            attributes: [
                [literal(`
                    CASE
                        WHEN price BETWEEN 0 AND 100 THEN '0-100'
                        WHEN price BETWEEN 101 AND 200 THEN '101-200'
                        WHEN price BETWEEN 201 AND 300 THEN '201-300'
                        WHEN price BETWEEN 301 AND 400 THEN '301-400'
                        WHEN price BETWEEN 401 AND 500 THEN '401-500'
                        WHEN price BETWEEN 501 AND 600 THEN '501-600'
                        WHEN price BETWEEN 601 AND 700 THEN '601-700'
                        WHEN price BETWEEN 701 AND 800 THEN '701-800'
                        WHEN price BETWEEN 801 AND 900 THEN '801-900'
                        ELSE '901-above'
                    END
                `), 'priceRange'],
                [fn('COUNT', col('id')), 'itemCount']
            ],
            where: {
                [Op.and]: [
                    Sequelize.where(fn('MONTH', col('dateOfSale')), month),
                    { sold: 1 }
                ]
            },
            group: ['priceRange'],
            raw: true
        });

        return data;
    }
    catch(error)
    {
        throw new Error(error);
    }
}


exports.getPieChartInfo=async (month)=>{
    try{
        const data = await productModel.findAll({
            attributes: [
                'category', 
                [fn('COUNT', col('id')), 'itemCount'] 
            ],
            where: {
                [Op.and]: [
                    Sequelize.where(fn('MONTH', col('dateOfSale')), month), 
                    { sold: 1 } 
                ]
            },
            group: ['category'], 
            raw: true
        });

        return data;
    }   
    catch(error)
    {
        throw new Error(error);
    }
}