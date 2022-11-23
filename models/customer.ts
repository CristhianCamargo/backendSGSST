import { DataTypes } from 'sequelize';
import dataBase from '../database/connection';
import Role from './role';
import Survey from './survey';

const Customer = dataBase.define('customer', {
  customerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'customer_id',
    autoIncrement: true
  },
  customerDocument: {
    type: DataTypes.STRING(10),
    field: 'customer_document',
    allowNull: false
  },
  customerFirstname: {
    type: DataTypes.STRING(20),
    field: 'customer_firstname',
    allowNull: false

  },
  customerLastname: {
    type: DataTypes.STRING(20),
    field: 'customer_lastname',
    allowNull: false
  },
  customerPhone: {
    type: DataTypes.STRING(20),
    field: 'customer_phone',
    allowNull: false
  },
  customerState: {
    type: DataTypes.BOOLEAN,
    field: 'customer_state',
    allowNull: false
  },
  /**
   * Foreign KEYS
   */

  roleId: {
    type: DataTypes.INTEGER,
    field: 'role_id',
    references: {
      model: Role
    },
    allowNull: false
  },
  surveyId: {
    type: DataTypes.INTEGER,
    field: 'survey_id',
    references: {
      model: Survey
    },
    allowNull: false
  },

},
  { timestamps: false }
);

/**
 * Relaciones entre modelos
 */

Role.hasMany(Customer, { foreignKey: 'roleId' });
Customer.belongsTo(Role, { foreignKey: 'roleId' });

Survey.hasMany(Customer, { foreignKey: 'surveyId' });
Customer.belongsTo(Survey, { foreignKey: 'surveyId' });

export default Customer;