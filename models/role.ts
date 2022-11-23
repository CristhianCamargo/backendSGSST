import { DataTypes } from 'sequelize';
import dataBase from '../database/connection';

const Role = dataBase.define('role', {
    roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'role_id',
        autoIncrement: true
    },
    roleName: {
        type: DataTypes.STRING(30),
        field: 'role_name',
        allowNull: false
    },
},
{timestamps:false}
);

export default Role;

