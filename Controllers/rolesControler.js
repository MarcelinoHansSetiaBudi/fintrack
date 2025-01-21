const models = require("../models");

const index = async (req, res) => {
  const Roles = await models.Roles.findAll();

  if (!Roles) {
    return res.status(404).json({
      status: "Error",
      message: "Data Not Found",
    });
  }

  return res.status(200).json({
    status: "success",
    data: Roles,
  });
};

const show = async (req, res) => {
  const { id } = req.params.id;

  const Roles = await models.Roles.findByPk(id);

  if (!Roles) {
    return res.status(404).json({
      status: "error",
      message: "data not found",
    });
  }

  return res.status(200).json({
    status: "success",
    data: Roles,
  });
};

const insert = async (req, res) => {
  const request = req.body;
  console.log(request);

  if (!request) {
    return res.status(404).json({
      status: "error",
      message: "Data not found",
    });
  }

  const transaction = await models.sequelize.transaction();
  console.log(transaction);
  try {
    const insert = await models.Roles.create(request, { transaction });

    await transaction.commit();

    return res.status(200).json({
      status: "success",
      data: insert,
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      status: "error",
      message: error,
    });
  }
};

const update = async (req, res) => {
  const request = req.body;
  const { id } = req.params;

  const Roles = await models.Roles.findByPk(id);

  if (!request || !Roles) {
    console.log(1);
    return res.status(404).json({
      status: "error",
      message: "data not found",
    });
  }

  const updated = await models.Roles.findByPk(id);

  try {
    updated.name = request.name;
    updated.updatedBy = request.updatedBy;

    return res.status(200).json({
      status: "success",
      message: "success updating data",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error,
    });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  const data = await models.Roles.findByPk(id);

  await data.destroy();

  return res.status(200).json({
    success: "true",
    message: "data deleted successfully",
  });
};

module.exports = {
  index,
  show,
  insert,
  update,
  destroy
};
