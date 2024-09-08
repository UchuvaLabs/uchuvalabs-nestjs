import { IsArray, IsNumber, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto'; 

export class CreateFarmerDto extends CreateUserDto {
    @IsString()
    experiencia: string; 

    @IsArray()
    certificaciones: string[]; 
    @IsNumber()
    areaTotalCultivable: number; 

    @IsArray()
    ubicacionesTierras: string[]; 

    @IsArray()
    historialCultivos: { 
        cultivoId: string; 
        tipoCultivo: string; 
        fechaInicio: Date; 
        fechaFin: Date;
        resumen: string; 
        rendimiento: number; 
    }[];
}
