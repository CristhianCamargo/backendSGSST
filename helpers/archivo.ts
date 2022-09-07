import * as path from 'path';
import { v4 } from 'uuid';

export const subirArchivo = ( files: any, carpeta = '' ) => {
  return new Promise<string>( ( resolve, reject ) => {
    const { uploadFile } = files;
    const nombreCortado = uploadFile.name.split('.');
    const extension = nombreCortado[ nombreCortado.length - 1 ];
    const nombreTemp = v4() + '.' + extension;
    const uploadPath = path.join( __dirname, '../', carpeta, nombreTemp );
    uploadFile.mv( uploadPath, ( err: any ) => {
      if ( err ) {
        reject( err );
      }
      const partesRuta = uploadPath.split( '/' );
      resolve( `${partesRuta[partesRuta.length - 2]}/${partesRuta[partesRuta.length - 1]}` );
    });
  } );
};