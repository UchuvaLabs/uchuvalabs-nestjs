import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, IsMongoId } from 'class-validator';


export class CreateCropDto {
  @IsNotEmpty()
  @IsString()
  nombreCultivo: string;

  @IsNotEmpty()
  @IsString()
  tipoCultivo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;


  @IsNotEmpty()
  @IsNumber()
  area: number;

  @IsNotEmpty()
  @IsString()
  ubicacion: string;

  @IsNotEmpty()
  @IsMongoId()
  agricultor: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  rendimientoEstimado: number; 

  @IsNotEmpty()
  @IsNumber()
  inversionNecesaria: number;

}
