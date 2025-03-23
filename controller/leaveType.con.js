const { where, Op } = require("sequelize");
const LeaveType = require("../Models/leaveType.mod") 

const CreateLeaveType = async (req, res, next) => {
  try {
    const { body } = req;
    console.log(body, "ewdqwdwd");
    if (!body) {
      return res.status(400).json({ error: "There is no data found!" });
    }
    const createDep = await LeaveType.create(body);
    if (!createDep) {
      return res
        .status(400)
        .json({ error: "LeaveType not created Please try again" });
    }

    res.status(201).json({ message: "Employe Created Sucessfully" });
    res.json("entered");
  } catch (error) {
    next(error);
  }
};

const UpdateLeaveType = async (req, res, next) => {
  try {
    const { params, body } = req;
    console.log(body, "dscsc");

    if (!params || !body) {
      return res.status(400).json({ error: "Please Retry" });
    }
    const findId = await LeaveType.findOne({ where: { id: params?.id } });
    if (!findId) {
      return res.status(400).json({ error: "Not Found" });
    }
    const updatedep = await LeaveType.update(body, {
      where: { id: params?.id },
    });
    res.status(201).json({ message: "Updated Successfully" });
  } catch (error) {
    next(error);
  }
};

const DeleteLeaveType = async (req, res, next) => {
  try {
    const { params } = req;
    console.log(params?.id, "sfsfsfs");
    if (!params) {
      return res.status(400).json({ error: "Please try again" });
    }
    const findid = await LeaveType.findOne({ where: { id: params?.id } });
    if (!findid) {
      return res.status(400).json({ error: "LeaveType not found!" });
    }
    const deleteEmp = await LeaveType.destroy({ where: { id: params?.id } });
    if (!deleteEmp) {
      return res.status(400).json({ error: "Please try again" });
    }
    res.status(201).json({ message: "LeaveType Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

const GetLeaveType = async (req, res, next) => {
  try {
    const { query, limit, page } = req.query;
    console.log(req.query, "jhvjhb");
    if (!query || !limit || !page) {
        const responce = await LeaveType.findAndCountAll();
        return res.status(200).json({ data: responce });
      }
    const responce = await LeaveType.findAndCountAll({
      where: { leavetype: { [Op.like]: `%${query}%` } },
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

const GetLeaveTypeById = async (req, res, next) => {
  try {
    const { query } = req;
    if (!query?.id) {
      return res.status(400).json("Please retry");
    }
    const responce = await LeaveType.findOne({ where: { id: query?.id } });
    if (!responce) {
      return res.status(202).json("Please refresh the Page");
    }
    res.status(200).json({ data: responce });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CreateLeaveType,
  GetLeaveType,
  DeleteLeaveType,
  GetLeaveTypeById,
  UpdateLeaveType,
};
