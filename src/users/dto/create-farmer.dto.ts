import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto'; 

export class CreateFarmerDto extends CreateUserDto {
    @IsString()
    @IsOptional()
    experiencia?: string; 

    @IsArray()
    @IsOptional()
    certificaciones?: string[]; 
    
    @IsNumber()
    @IsOptional()
    areaTotalCultivable?: number; 

    @IsArray()
    @IsOptional()
    ubicacionesTierras?: string[]; 

    @IsArray()
    @IsOptional()
    historialCultivos?: { 
        cultivoId: string; 
        tipoCultivo: string; 
        fechaInicio: Date; 
        fechaFin: Date;
        resumen: string; 
        rendimiento: number; 
    }[];
}
