import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title of the blog post',
    example: 'Getting Started with NestJS',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Content of the blog post',
    example: 'This is a detailed guide about getting started with NestJS...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
} 