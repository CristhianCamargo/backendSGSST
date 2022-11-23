import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import Customer from "../models/customer";

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('tokenAccess');
  if (!token) {
    return res.status(401).json({ message: 'No hay token en la petición' });
  }
  try {
    const { id }: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY!);
    // Comprobar si el uid es diferente de 0 para invitado
    if (id != 0) {
      // Leer el usuario que corresponde al uid
      const customer = await Customer.findByPk(id, {
        attributes: ['customerId', 'roleId', 'customerState']
      });
      if (!customer) {
        return res.status(401).json({ message: 'Por favor inicie sesión nuevamente.' });
      }
      // Verificar si el id es activo
      /*
      if (usuario?.getDataValue('customer_state') != true) {
        return res.status(401).json({ message: 'Por favor inicie sesión nuevamente.' });
      }
      */
      req.customer = customer;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Por favor inicie sesión nuevamente.' });
  }
}
