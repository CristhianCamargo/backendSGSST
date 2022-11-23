import { NextFunction, Request, Response } from 'express';

export const validateRole = ( ...role: number [] ) => {
  return ( req: Request, res: Response, next: NextFunction ) => {
    if ( ! role.includes( ( req as any ).customer.getDataValue('roleId') ) ) {
      return res.status( 401 ).json( { message: 'No tiene permisos para ejecutar esta acción.' } );
    }
    next();
  }
}