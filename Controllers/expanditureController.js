const models = require("../models");

const index = async (req, res) => {
  const Expanditures = await models.Expanditure.findAll();

  if (!Expanditures) {
    return res.status(404).json({
      status: "error",
      message: "Data not found",
    });
  }
  return res.status(200).json({
    status: "success",
    data: Expanditures,
  });
};

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await models.Expanditure.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Data not found",
      });
    }

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

const insert = async (req, res) => {
  let request = req.body;
  try {
    if (!request) {
      console.log(123);
      return res.status(404).json({
        status: "error",
        message: "Data not found",
      });
    }
    const insert = await models.Expanditure.create({
      expanditure_type: request.expanditure_type,
      amount: request.amount,
      date: request.date,
      created_by: request.created_by,
    });

    return res.status(200).json({
      status: "success",
      data: insert,
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

    try{
        if(!request.length){
            return res.status(404).json({
                status: "error",
                message: "Data not found"
            });
        }

        const data = await models.Expanditre.findByPk(id);

        if(request.transactionId != '')
        {
            data.transactionId = request.transactionId;
        }

        data.expanditure_type   =   request.expanditure_type;
        data.amount             =   request.amount;
        data.date               =   request.date;

        await data.update();

        return res.status(200).json({
            status: "success",
            data: data
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const destroy = async (req, res) => {
    const { id } = req.params;
    try{
        const data = await models.Expanditure.findByPk(id);
        if(!data){
            return res.status(404).json({
                status: "error",
                message: "Data not found"
            });
        }

        await data.destroy();
        return res.status(200).json({
            status: "success",
            message: "Data deleted successfully"
        });
    }catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
  index,
  show,
  insert,
  update,
  destroy
};
