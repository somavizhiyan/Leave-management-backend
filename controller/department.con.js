const { where, Op } = require("sequelize");
const Department = require("../Models/department.mod");
// const { Op } = require('sequelize');
const Createdepartment = async (req, res, next) => {
  try {
    const { body } = req;
    console.log(body, "ewdqwdwd");
    if (!body) {
      return res.status(400).json({ error: "There is no data found!" });
    }
    const createDep = await Department.create(body);
    if (!createDep) {
      return res
        .status(400)
        .json({ error: "Department not created Please try again" });
    }

    res.status(201).json({ message: "Department Created Sucessfully" });
    res.json("entered");
  } catch (error) {
    next(error);
  }
};

const Updatedepartment = async (req, res, next) => {
  try {
    const { params, body } = req;
    console.log(body, "dscsc");

    if (!params || !body) {
      return res.status(400).json({ error: "Please Retry" });
    }
    const findId = await Department.findOne({ where: { id: params?.id } });
    if (!findId) {
      return res.status(400).json({ error: "Not Found" });
    }
    const updatedep = await Department.update(body, {
      where: { id: params?.id },
    });
    res.status(201).json({ message: "Updated Successfully" });
  } catch (error) {
    next(error);
  }
};

const Deletedepartment = async (req, res, next) => {
  try {
    const { params } = req;
    console.log(params?.id, "sfsfsfs");
    if (!params) {
      return res.status(400).json({ error: "Please try again" });
    }
    const findid = await Department.findOne({ where: { id: params?.id } });
    if (!findid) {
      return res.status(400).json({ error: "Department not found!" });
    }
    const deletedep = await Department.destroy({ where: { id: params?.id } });
    if (!deletedep) {
      return res.status(400).json({ error: "Please try again" });
    }
    res.status(201).json({ message: "Department Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

const Getdepartment = async (req, res, next) => {
  try {
    const { query, limit, page } = req.query;
    console.log(req.query, "jhvjhb");
    
    if ( !limit || !page) {
      const responce = await Department.findAndCountAll();
      return res.status(200).json({ data: responce });
    }
    const responce = await Department.findAndCountAll({
      where: { DepartmentName: { [Op.like]: `%${query}%` } },
      limit: Number(limit),
      offset: Number(page - 1) * Number(limit),
      order: [["createdAt", "DESC"]],
    });
    if (!responce) {
      return res.status(202).json("Please refresh the Page");
    }
    res.status(200).json({ data: responce });
  } catch (error) {
    next(error);
  }
};

const GetdepartmentById = async (req, res, next) => {
  try {
    const { query } = req;
    if (!query?.id) {
      return res.status(400).json("Please retry");
    }
    const responce = await Department.findOne({ where: { id: query?.id } });
    if (!responce) {
      return res.status(202).json("Please refresh the Page");
    }
    res.status(200).json({ data: responce });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Createdepartment,
  Getdepartment,
  Deletedepartment,
  GetdepartmentById,
  Updatedepartment,
};
