
import { DataTypes } from 'sequelize';

import { sequelize } from "../database/database.js";


export const Photo = sequelize.define(
  "photo", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, },
    user_id: { type: DataTypes.INTEGER, allowNull: false, },
  }
)