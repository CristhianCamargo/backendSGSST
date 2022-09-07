import { Type } from '@sinclair/typebox';

export const AuthLoginSchema = Type.Object( {
  usuario: Type.String(),
  contrasena: Type.String()
}, {
  additionalProperties: false
} );
