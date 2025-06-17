import { IsString, IsEnum, MinLength, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Username of the user',
    minLength: 3,
    example: 'johndoe',
  })
  @IsString()
  @MinLength(3)
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Password of the user',
    minLength: 6,
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({
    description: 'Role of the user',
    enum: UserRole,
    example: UserRole.USER,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
} 