// require("dotenv").config();

const models    = require('../models');
const Salaries  = require('../models/salary');

const index = async (req, res) => {    
    try{
        const data = await models.Salaries.findAll();

        if(data)
        {
            return res.status(200).json({
                status: "success",
                data: datas
            });
        }
        else{
            return res.status(404).json({
                status: "error",
                message: "Data not found"
            });
        }
    }catch (error){
        console.log(error);
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    index
}