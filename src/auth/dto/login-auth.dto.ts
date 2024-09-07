import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-auth.dto';

export class UpdateAuthDto extends PartialType(RegisterUserDto) {}
