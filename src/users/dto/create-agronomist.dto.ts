import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto'; 

export class CreateAgronomistDto extends CreateUserDto {
    @IsString()
    @IsNotEmpty()
    tituloUniversitario: string; 

    @IsString()
    especializacion: string; 

    @IsArray()
    areasExpertise: string[]; 

    @IsString()
    certificaciones:string[]; 
}
