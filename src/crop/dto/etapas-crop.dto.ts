import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EtapaDto {
  @IsNotEmpty()
  @IsDate()
  fechaInicio: Date;

  @IsNotEmpty()
  @IsNumber()
  costo: number; // Costo de la etapa en USD

  @IsNotEmpty()
  @IsString()
  descripcion: string;
}
