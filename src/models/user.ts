import { DataTypes, Model } from 'sequelize'
import database from '../database/connection'
import type { UUID } from '@/types'

export class User extends Model {
  declare uuid: UUID
  declare username: string
  declare email: string
  declare password: string
  declare active: boolean
}

User.init({
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
  sequelize: database,
  tableName: 'users',
  timestamps: true,
  modelName: 'User'
})
