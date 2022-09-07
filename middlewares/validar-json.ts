import { NextFunction, Request, Response } from 'express';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import localize from 'ajv-i18n';

export const validarJSON = ( schema: any ) => {
  return ( req: Request, res: Response, next: NextFunction ) => {
    const ajv = new Ajv( { allErrors: true, messages: false } );
    addFormats( ajv ).addKeyword('kind').addKeyword('modyfier');
    addErrors( ajv );
    const validate = ajv.compile( schema );
    const isValid = validate( req.body );
    if ( ! isValid ) {
      localize.es( validate.errors );
      return res.status(400).send( ajv.errorsText( validate.errors, { separator: '\n' } ) )
    }; 
    next();
  }
}
