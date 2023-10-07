import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Op } from 'sequelize';

import { User } from "../model/user.js"

export async function createUser(req,res){
  const {email, username, password } = req.body;
  try{
    let user = await User.findOne({
      where: { [Op.or]: [
        { username: username },
        { email: email }
      ] }
    });
    if (user) {
      if (user.email === email)
        return res.status(400).json({ message: "EMAIL_USED" });
      if (user.username === username)
        return res.status(400).json({ message: "USER_USED" });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    user = await User.create({
      email,
      username,
      password: passwordHash,
    },{
      fields: ["email", "username", "password"],
    }
    );
    return res.json("OK")
  }catch(error){
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) {
      let password_valid = await bcrypt.compare(req.body.password, user.password);
      if (password_valid) {
        let token = jwt.sign({
          'userId': user.id,
          'email': user.email,
          'expiresIn': 86400//1 dia
        }, process.env.SECRET_TOKEN);
        res.status(200).json({ token: token });
      } else {
        res.status(400).json({ error: "PASSWORD_ERROR" });
      }
    } else {
      res.status(404).json({ error: "USER_NOT_EXIST" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}