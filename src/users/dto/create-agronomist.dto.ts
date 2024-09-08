import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto'; 

export class CreateAgronomistDto extends CreateUserDto {
    @IsString()
    @IsNotEmpty()
    tituloUniversitario: string; 

    @IsString()
    especializacion: string; 

    @IsArray()
    @IsOptional()
    areasExpertise?: string[]; 

    @IsString()
    @IsOptional()
    certificaciones?:string[]; 
}
