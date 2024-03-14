import { DataTypes } from 'sequelize'
import database from '../database/connection'

export const User = database.define('User', {
  uuid: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING({ length: 18 }),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING({ length: 50 }),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(),
    allowNull: false
  },
  active: {
    type: DataTypes.BOOLEAN(),
    defaultValue: true,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'users'
})
