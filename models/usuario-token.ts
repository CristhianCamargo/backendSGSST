import { DataTypes } from 'sequelize';
import db from '../database/connection';
import Usuario from './usuario';

const UsuarioToken = db.define( 'usuario_token', {
  idUsuarioToken: {
    type: DataTypes.INTEGER,
    field: 'id_usuario_token',
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    field: 'usuario_id',
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  token: { type: DataTypes.TEXT }
}, {
  name: {
    singular: 'usuario_token',
    plural: 'usuario_token'
  },
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
} );

export default UsuarioToken;