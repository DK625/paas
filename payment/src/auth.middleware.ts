import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa'; // Thư viện để lấy public key từ JWKS endpoint của Auth0
import { ITokenPayload } from './custom';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private jwksClient: jwksClient.JwksClient;

  constructor() {
    this.jwksClient = jwksClient({
      jwksUri:
        'https://dev-u67s63gaoytg80ad.us.auth0.com/.well-known/jwks.json', // Thay thế domain Auth0 của bạn
    });
  }

  private getKey(header: any, callback: any) {
    this.jwksClient.getSigningKey(header.kid, (err, key) => {
      if (err) {
        return callback(err, null);
      }
      const publicKey = key.getPublicKey();
      callback(null, publicKey);
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    // Lấy token từ header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Tách "Bearer <token>"

    if (!token) {
      throw new HttpException(
        'Token không có, cần phải đăng nhập',
        HttpStatus.UNAUTHORIZED,
      );
    }

    jwt.verify(
      token,
      this.getKey.bind(this),
      { algorithms: ['RS256'] },
      (err, decoded: ITokenPayload) => {
        if (err) {
          throw new HttpException(
            'Token không hợp lệ hoặc hết hạn',
            HttpStatus.UNAUTHORIZED,
          );
        }

        const id = decoded.sub.split('|')[1];
        req.user = { id, ...decoded };

        next();
      },
    );
  }
}
