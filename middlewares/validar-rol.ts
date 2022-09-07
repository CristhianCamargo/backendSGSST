import { NextFunction, Request, Response } from 'express';

export const tieneRol = ( ...roles: number [] ) => {
  return ( req: Request, res: Response, next: NextFunction ) => {
    if ( ! roles.includes( ( req as any ).usuario.getDataValue('usuario_rol_id') ) ) {
      return res.status( 401 ).json( { message: 'No tiene permisos para ejecutar esta acción.' } );
    }
    next();
  }
}