const { where, Op } = require("sequelize");
const Employe = require("../Models/employe.mod");
const bcrypt = require("bcrypt");
const CreateEmploye = async (req, res, next) => {
  try {
    const { body } = req;
    console.log(body, "ewdqwdwd");
    if (!body) {
      return res.status(400).json({ error: "There is no data found!" });
    }
    const hashedPass = await bcrypt.hash(body?.password, 10);
    body.password = hashedPass;
    const createDep = await Employe.create(body);
    if (!createDep) {
      return res
        .status(400)
        .json({ error: "Employe not created Please try again" });
    }

    res.status(201).json({ message: "Employe Created Sucessfully" });
    res.json("entered");
  } catch (error) {
    next(error);
  }
};

const UpdateEmploye = async (req, res, next) => {
  try {
    const { params, body } = req;
    console.log(body, "dscsc");

    if (!params || !body) {
      return res.status(400).json({ error: "Please Retry" });
    }
    const findId = await Employe.findOne({ where: { id: params?.id } });
    if (!findId) {
      return res.status(400).json({ error: "Not Found" });
    }
    if (body?.password) {
      const hashedPass = await bcrypt.hash(body?.password, 10);
      body.password = hashedPass;
    }

    const updatedep = await Employe.update(body, {
      where: { id: params?.id },
    });
    res.status(201).json({ message: "Updated Successfully" });
  } catch (error) {
    next(error);
  }
};

const DeleteEmploye = async (req, res, next) => {
  try {
    const { params } = req;
    console.log(params?.id, "sfsfsfs");
    
    if (!params) {
      return res.status(400).json({ error: "Please try again" });
    }
    const findid = await Employe.findOne({ where: { id: params?.id } });
    if (!findid) {
      return res.status(400).json({ error: "Employe not found!" });
    }
    const deleteEmp = await Employe.destroy({ where: { id: params?.id } });
    if (!deleteEmp) {
      return res.status(400).json({ error: "Please try again" });
    }
    res.status(201).json({ message: "Employe Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

const GetEmploye = async (req, res, next) => {
  try {
    const { query, limit, page } = req.query;
    console.log(req.query, "jhvjhb");

    if (!query || !limit || !page) {
      const responce = await Employe.findAndCountAll();
      return res.status(200).json({ data: responce });
    }
    const responce = await Employe.findAndCountAll({
      where: { firstname: { [Op.like]: `%${query}%` } },
      limit: Number(limit),
      offset: Number(page - 1) * Number(limit),
      order: [["createdAt", "ASC"]],
    });
    if (!responce) {
      return res.status(202).json("Please refresh the Page");
    }
    res.status(200).json({ data: responce });
  } catch (error) {
    next(error);
  }
};

const GetEmployeById = async (req, res, next) => {
  try {
    const { query } = req;
    if (!query?.id) {
      return res.status(400).json("Please retry");
    }
    const responce = await Employe.findOne({ where: { id: query?.id } });
    if (!responce) {
      return res.status(202).json("Please refresh the Page");
    }
    res.status(200).json({ data: responce });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CreateEmploye,
  GetEmploye,
  DeleteEmploye,
  GetEmployeById,
  UpdateEmploye,
};
