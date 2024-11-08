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

    try{
        const data = await models.Expanditure.findByPk(id);
        
        if(!data) {
            return res.status(404).json({
                status: "error",
                message: "Data not found"
            });
        }

        return res.status(200).json({
            status: "success", 
            data: data
        });
    }catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
}

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
      expanditure_type  : request.expanditure_type,
      amount            : request.amount,
      date              : request.date,
      created_by        : request.created_by,
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

module.exports = {
  index,
  show,
  insert,
};
