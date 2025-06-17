import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { SignupDto } from './Dtos/signup.dto';
import { LoginDto } from './Dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserRole } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  validateToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  extractTokenFromHeaders(headers: Record<string, string | string[]>): string {
    const authHeader = headers['authorization'];

    if (!authHeader || !authHeader.toString().startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    return authHeader.toString().split(' ')[1];
  }

  async signup(
    signupDto: SignupDto,
  ): Promise<{ message: string }> {
    const currentUser = await this.userService.findByEmail(signupDto.email);
    if (currentUser) {
      throw new HttpException('Sorry, this user already exists', 401);
    }

    const user = await this.userService.create({
      email: signupDto.email,
      password: signupDto.password,
      role: UserRole.USER,
    });

    await this.userRepository.save(user);


    return { message: 'User created successfully' };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ message: string; token: string; user: Partial<User> }> {
    // Find user by email
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }



    const token = this.jwtService.sign({ id: user.id, email: user.email, role: user.role });
    return { message: 'Login successful', token, user };
  }



  async register(signupDto: SignupDto): Promise<User> {
    const { email, password } = signupDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'email', 'role', 'createdAt', 'updatedAt'],
    });
  }
}
