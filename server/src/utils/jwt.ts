import jwt from 'jsonwebtoken';
import { ICreateJWTResponse, Payload } from '../interfaces/authInterface';
import { dbConfig } from '../config/dbConfig';

export const addJWT = (payload: Payload): Promise<ICreateJWTResponse> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, dbConfig.getKey(), (err: Error | null, token: string | undefined) => {
      if (err) {
        return reject('Error al firmar el token');
      }

      if (!token) {
        return reject('El token no pudo generarse');
      }

      resolve({ token });
    });
  });
};
