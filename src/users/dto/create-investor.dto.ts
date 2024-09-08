
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateInvestorDto extends CreateUserDto {
  @IsNumber()
  capitalDisponible: number;

  @IsArray()
  @IsString({ each: true })
  areasInteres: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  @IsOptional()
  inversionesPrevias?: { proyecto: string; monto: number }[];
}

