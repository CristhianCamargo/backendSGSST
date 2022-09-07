import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import Usuario from "../models/usuario";
import UsuarioToken from "../models/usuario-token";

export const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-api-key-token');
  if (!token) {
    return res.status(401).json({ message: 'No hay token en la petición' });
  }
  try {
    const { uid }: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY!);
    // Comprobar si el uid es diferente de 0 para invitado
    if (uid != 0) {
      //Verificar si el token está registrado
      const usuarioToken = await UsuarioToken.findOne( {
        where: { token }
      } );
      if ( ! usuarioToken ) {
        return res.status(401).json({ message: 'Por favor inicie sesión nuevamente.' });
      }
      // Leer el usuario que corresponde al uid
      const usuario = await Usuario.findByPk(uid, {
        attributes: [ 'id', 'rol', 'estado' ]
      });
      if (!usuario) {
        return res.status(401).json({ message: 'Por favor inicie sesión nuevamente.' });
      }
      // Verificar si el uid es activo
      if (usuario?.getDataValue('estado') != 'Activo') {
        return res.status(401).json({ message: 'Por favor inicie sesión nuevamente.' });
      }
      req.usuario = usuario;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Por favor inicie sesión nuevamente.' });
  }
}
