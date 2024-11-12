// require("dotenv").config();

const models = require("../models");
const { where } = require("sequelize");

const index = async (req, res) => {
  try {
    let datas = await models.Salary.findAll();

    if(!datas)
    {
        return res.status(404).json({
            status: "error",
            message: "Data not found"
        })
    }

    return res.status(200).json({
      status: "success",
      data: datas,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await models.Salary.findByPk(id);

    if (data) {
      return res.status(200).json({
        status: "success",
        data: data,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Data not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const insert = async (req, res) => {
  const request = req.body;

  try {
    if (!request.length) {
      return res.status(404).json({
        status: "error",
        message: "Data not found",
      });
    }
    const data = await models.Salary.create({
        salary_type : request.salary_type,
        amount      : request.amount,
        date        : request.date
    });

    return res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  const request = req.body;
  const { id } = req.params;

  try {
    const salary = await models.Salary.findByPk(id);
    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Data not found",
      });
    } else {
      salary.salary_type = request.salary_type;
      salary.amount = request.amount;
      salary.date = request.date;
      salary.updatedAt = new Date();

      await salary.update();

      return res.status(200).json({
        status: "success",
        data: data,
      });
    }
  } catch (error) {
    console.log(erorr);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const salary = await models.Salary.findByPk(id);

    if (!salary) {
      return res.status(500).json({
        status: "error",
        message: "Data not found",
      });
    }

    await salary.destroy();

    return res.status(200).json({
      status: "success",
      message: "Data deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  index,
  show,
  insert,
  update,
  destroy,
};
