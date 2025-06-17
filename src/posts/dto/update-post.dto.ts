import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiPropertyOptional({
    description: 'Title of the blog post',
    example: 'Updated: Getting Started with NestJS',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Content of the blog post',
    example: 'This is an updated guide about getting started with NestJS...',
  })
  @IsString()
  @IsOptional()
  content?: string;
} 