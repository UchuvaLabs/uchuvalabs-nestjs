import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, IsMongoId, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class EtapaDto {
    @IsNotEmpty()
    @IsDate()
    fechaInicio: Date;
  
    @IsNotEmpty()
    @IsNumber()
    costo: number;
  
    @IsNotEmpty()
    @IsString()
    descripcion: string;
  }

export class DetailCropDto {
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
  @IsDate()
  fechaSiembra: Date;

  @IsNotEmpty()
  @IsDate()
  fechaCosecha: Date;

  @IsNotEmpty()
  @IsNumber()
  area: number; // Área en hectáreas

  @IsNotEmpty()
  @IsNumber()
  rendimientoEstimado: number; // Rendimiento estimado en kg

  @IsNotEmpty()
  @IsString()
  ubicacion: string;

  @IsNotEmpty()
  @IsNumber()
  inversionNecesaria: number; // Inversión necesaria en USD

  @IsNotEmpty()
  @IsMongoId()
  agricultor: string; // ID del agricultor

  @IsNotEmpty()
  @IsMongoId()
  agronomo: string; // ID del agrónomo

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  inversores?: string[]; // IDs de los inversores

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Object)
  detallesCultivo: {
   
    cantidadSembrada: number;

    
    tiempoCrecimiento: string;

    
    devolucionEstimacion: string;

    
    requerimientos?: string;

    
    plagasComunes?: string[];
  };
}

