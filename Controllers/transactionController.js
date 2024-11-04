require("dotenv").config();

const Transaction = require("../models/transaction");
const models = require("../models");
const { where } = require("sequelize");
const Salary = require("../models/salary");
const Expanditure = require("../models/expanditure");
// const { Pool }    = require('pg')
// const pool        = new Pool()

// const client      = await pool.connect()

const index = async (req, res) => {
  console.log(123);
  try {
    let datas = await models.Transaction.findAll();

    return res.status(200).json({
      status: "success",
      message: datas,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const show = async (req, res) => {
  let request = req.params;
  console.log(request);
  try {
    if (!request) return res.sendStatus(204);
    let data = await models.Transaction.findOne({
      where: {
        id: request.id,
      },
    });

    return res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

const insert = async (req, res) => {
  const transaction = await models.sequelize.transaction();
  let request = req.body;

  try {
    // await client.query('BEGIN');
    // Start a transaction
    if (!request) return res.sendStatus(204);

    let transactionType = req.body.transaction_type;
    // transactionType.toLowerCase();
    // console.log(transactionType);
    let insert = await models.Transaction.create({
      transaction_type: request.transaction_type,
      transaction_receipt_image: request.transaction_receipt_image,
      date_of_transaction: request.date_of_transaction,
      created_by: request.created_by, // ini nanti ambil dari user yang login trus get ke table users ambil id
    });

    if (transactionType == "pemasukkan") {
      // console.log(insert.id);
      var createSalary = await models.Salary.create({
        transaction_id: insert.id,
        salary_type: request.type,
        amount: request.amount,
        date: request.date_of_transaction,
      });
    }
    if (transactionType == "pengeluaran") {
      var createExpanditure = await models.Expanditure.create({
        transactionId: insert.id,
        expanditure_type: request.type,
        amount: request.amount,
        date: request.date_of_transaction,
        created_by: request.created_by,
      });
    }

    await transaction.commit();

    // await client.query('COMMIT');
    const relatedData = transactionType === "pemasukkan" ? { salary_data: createSalary } : { expanditure_data: createExpanditure };

    return res.status(201).json({
      status: `success creating transaction and ${transactionType === "pemasukkan" ? 'salary' : 'expanditure'} data`,
      transaction_data: insert,
      ...relatedData,
    });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return res.status(500).json({
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  let request = req.body;
  const { id } = req.params;
  try {
    // if(!request.length) return res.status(204).json({ message: "No content to update" }); // no content
    let transaction = await models.Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ message: "Data transaction not found" }); // 404 - Not found
    }

    transaction.transaction_type = request.transaction_type;
    transaction.transaction_receipt_image = request.transaction_receipt_image;
    transaction.date_of_transaction = request.date_of_transaction;
    transaction.created_by = request.created_by;
    transaction.updatedAt = new Date();

    await transaction.update();

    return res.status(200).json({
      message: "success updating data",
      data: transaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// delete by pk
const destroy = async (req, res) => {
  const { id } = req.params;
  const data = await models.Transaction.findByPk(id);

  if(data)
  {
    await data.destroy();

    return res.status(200).json({
      status: "success",
      message: "Data deleted successfully"
    });
  }
  else
  {
    return res.status(404).json({
      status: "error",
      message: "Data not found"
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
