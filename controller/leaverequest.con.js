const { where, Op } = require("sequelize");
const LeaveRequest = require("../Models/leaverequest.mod");
const Createleaverequest = async (req, res, next) => {
  try {
    const { body } = req;
    console.log(body, "ewdqwdwd");
    if (!body) {
      return res.status(400).json({ error: "There is no data found!" });
    }
    const createlevreq = await LeaveRequest.create(body);
    if (!createlevreq) {
      return res
        .status(400)
        .json({ error: "LeaveRequest not Submitted Please try again" });
    }

    res.status(201).json({ message: "Submitted Sucessfully" });
    res.json("entered");
  } catch (error) {
    next(error);
  }
};

const Updateleaverequest = async (req, res, next) => {
  try {
    const { params, body } = req;
    console.log(body, "dscsc");

    if (!params || !body) {
      return res.status(400).json({ error: "Please Retry" });
    }
    const findId = await LeaveRequest.findOne({ where: { id: params?.id } });
    if (!findId) {
      return res.status(400).json({ error: "Not Found" });
    }
    const updatelevreq = await LeaveRequest.update(body, {
      where: { id: params?.id },
    });
    if (!updatelevreq) {
      return res.status(404).json({ error: "Please Try Again" });
    }
    res.status(201).json({ message: "Updated Successfully" });
  } catch (error) {
    next(error);
  }
};

const Deleteleaverequest = async (req, res, next) => {
  try {
    const { params } = req;
    console.log(params?.id, "sfsfsfs");
    if (!params) {
      return res.status(400).json({ error: "Please try again" });
    }
    const findid = await LeaveRequest.findOne({ where: { id: params?.id } });
    if (!findid) {
      return res.status(400).json({ error: "LeaveRequest not found!" });
    }
    const deletelevreq = await LeaveRequest.destroy({
      where: { id: params?.id },
    });
    if (!deletelevreq) {
      return res.status(400).json({ error: "Please try again" });
    }
    res.status(201).json({ message: "Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

const Getleaverequest = async (req, res, next) => {
  try {
    const { query, limit, page, status } = req.query;
    console.log(req.query, "jhvjhb");

    const whereCondition = {
      leavetype: { [Op.like]: `%${query}%` },
    };
    
    if (status != 3) {
      whereCondition.status = status;
    }
    
    const response = await LeaveRequest.findAndCountAll({
      where: whereCondition,
      limit: Number(limit),
      offset: Number(page - 1) * Number(limit),
      order: [["createdAt", "DESC"]],
    });
    
    return res.status(200).json({ data: response });
    
    
    return res.status(200).json({ data: response });
    

    if (!responce) {
      return res.status(202).json("Please refresh the Page");
    }
    res.status(200).json({ data: responce });
  } catch (error) {
    next(error);
  }
};

const GetleaverequestById = async (req, res, next) => {
  try {
    const { query } = req;
    if (!query?.id) {
      return res.status(400).json("Please retry");
    }
    const responce = await LeaveRequest.findOne({ where: { id: query?.id } });
    if (!responce) {
      return res.status(202).json("Please refresh the Page");
    }
    res.status(200).json({ data: responce });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Createleaverequest,
  Getleaverequest,
  Deleteleaverequest,
  GetleaverequestById,
  Updateleaverequest,
};
