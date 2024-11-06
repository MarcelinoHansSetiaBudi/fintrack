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

const show = async (req, res) => {
    const { id } = req.params;
    try{
        let data  = await models.Salaries.findByPk(id);

        if(data){
            return res.status(200).json({
                status: "success",
                data: data
            });
        }
        else
        {
            return res.status(404).json({
                status: "error",
                message: "Data not found"
            });
        }
    }catch (error){
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
}

const insert = async (req, res) => {
    const request = req.body;

    try{

    }catch (error){
        console.log(error);
        return res.status(500).json({
            message: error.message
        })
    }
}

const update = async (req, res) => {
    const request = req.body;
    const { id } = req.params;

    try{
        const data = await models.Salaries.findByPk(id);
        if(!data){
            console.log(123);
            console.log(data);
            return res.status(404).json({
                status: "error",
                message: "Data not found"
            });
        }
        else{
            console.log(data);
            return res.status(200).json({
                status: "success",
                data: data
            })
        }
    } catch (error) {
        console.log(erorr);
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    index,
    show,
    insert,
    update
}