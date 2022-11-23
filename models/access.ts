import { DataTypes } from "sequelize";

import dataBase from "../database/connection";
import Customer from "./customer";

const Access = dataBase.define(
    "access",
    {
        accessEmail: {
            type: DataTypes.STRING(100),
            field: "access_email",
            allowNull: false,
        },
        accessPass: {
            type: DataTypes.STRING(100),
            field: "access_pass",
            allowNull: false,
        },

        /**
         * Foreign KEYS
         */
        customerId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'customer_id',
            references: {
              model: Customer
            },
            allowNull: false
          }
    },
    {
        timestamps: false,
    }
);

/**
 * Relaciones
 */

 Customer.hasOne(Access,{foreignKey: 'customerId'});
 Access.belongsTo(Customer, {foreignKey: 'customerId'});

export default Access;