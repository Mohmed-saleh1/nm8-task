import { Request } from 'express';
import { User } from '../user/entities/user.entity';

export interface AuthenticationRequest extends Request {
  user?: User;
}
