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
