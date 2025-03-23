const bcrypt = require("bcrypt");
const Employe = require("../Models/employe.mod");
const User = require("../Models/users");

const empsignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employe = await Employe.findOne({ where: { email } });

    if (!employe) {
      return res.status(404).json({ error: "User not Found" });
    }

    const ismatch = await bcrypt.compare(password, employe?.password);

    if (!ismatch) {
      return res.status(404).json({ error: "password mismatch" });
    }
    const role = employe?.role;
    const id = employe?.id
    const name = employe?.firstname+" "+ employe?.lastname
    res.json({ message: "Logged in Successfully", role ,id,name});
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const adminsignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ where: { email } });

    if (!admin) {
      return res.status(404).json({ error: "User not Found" });
    }

    const ismatch = await bcrypt.compare(password, admin?.newpassword);

    if (!ismatch) {
      return res.status(404).json({ error: "password mismatch" });
    }
    const role = admin?.role;
    const id = admin?.id
    const name = admin?.firstname+" "+ admin?.lastname

    res.json({ message: "Logged in Successfully", role ,id,name});
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const adminsignup = async (req, res) => {
  try {
    const { body } = req;

    const findExistUseremail = await User.findOne({
      where: { email: body?.email },
    });

    if (findExistUseremail) {
      return res.json({ error: "User already exist!" });
    }

    const hashedpassword = await bcrypt.hash(body?.newpassword, 10);
    body.newpassword = hashedpassword;

    const user = await User.create(body);

    if (!user) {
      return res.json({ message: "Please try again" });
    }

    res.status(201).json({ message: "Admin Created Successfuly" });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const adminupdate = async (req, res) => {
    try {
      const { body } = req;
  
      const findadmin = await User.findOne({email:body?.email});
    
      const checkpass = await bcrypt.compare(body?.oldpassword,findadmin?.newpassword);
      if(!checkpass){
        return res.status(404).json({error:"Password mismatch"})
      }
      const hashedpassword = await bcrypt.hash(body?.newpassword, 10);
      body.newpassword = hashedpassword;
  
      const user = await User.update(body,{where:{id:body?.id}});
  
      if (!user) {
        return res.json({ message: "Please try again" });
      }
  
      res.status(201).json({ message: "Admin updated Successfuly" });
    } catch (error) {
      return res.json({ error: error.message });
    }
  };

  const getadmindata = async (req, res, next) => {
    try {
        const {id} = req.params
      const responce = await User.findOne({where:{id:id}});
      if (!responce) {
        return res.status(202).json("Please refresh the Page");
      }
      responce.newpassword = ""
      res.status(200).json({ data: responce });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  empsignin,
  adminsignin,
  adminsignup,
  adminupdate,
  getadmindata
};
