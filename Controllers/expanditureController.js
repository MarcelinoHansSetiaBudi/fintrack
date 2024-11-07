const models = require('../models');
const Expanditures = require("../models/expanditure");

const index = async (req, res) => {
    const Expanditures = await models.Expanditures.findAll();

    if(!Expanditures)
    {
        return res.status(404).json({
            status: "error",
            message: "Data not found"
        });
    }
    return res.status(200).json({
        status: "success",
        data: Expanditures
    });
}

module.exports = {
    index
}