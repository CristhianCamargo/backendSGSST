import { DataTypes } from 'sequelize';

import dataBase from '../database/connection';

const Usuario = dataBase.define( 'Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'id_usuarios'
  },
  nombre: {
    type: DataTypes.STRING
  },

} );

export default Usuario;