import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterPatientDTO {
  @ApiProperty()
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;
}
