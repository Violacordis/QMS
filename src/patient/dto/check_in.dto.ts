import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CheckInPatientDTO {
  @ApiProperty()
  @IsString()
  regNum: string;
}
