declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
export {};

interface IUser extends ITokenPayload {
  id: string;
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  scope: string;
  azp: string;
}

export interface ITokenPayload {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  scope: string;
  azp: string;
}
