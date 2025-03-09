import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { ApiResponseMetadata } from 'src/common/decorators/res.decorator';
import { RegisterPatientDTO } from './dto/register-patient.dto';
import { CheckInPatientDTO } from './dto/check_in.dto';

@ApiTags('Patient ')
@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @ApiResponseMetadata({ message: 'Patient registered successfully' })
  @ApiOperation({ summary: 'register patient' })
  @Post('register')
  async registerPatient(@Body() dto: RegisterPatientDTO) {
    return this.patientService.registerPatient(dto);
  }

  @ApiResponseMetadata({ message: 'Patient checkedIn successfully' })
  @ApiOperation({ summary: 'checkin patient' })
  @Post('checkin')
  async checkInPatient(@Body() dto: CheckInPatientDTO) {
    return this.patientService.checkInPatient(dto);
  }
}
