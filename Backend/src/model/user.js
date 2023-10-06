import { sequelize } from "../database/database.js";

import { DataTypes } from 'sequelize';

export const User = sequelize.define(
  "user",{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, },
    username: { type: DataTypes.STRING, allowNull: false, },
    password: { type: DataTypes.STRING, allowNull: false, },
  }
)

