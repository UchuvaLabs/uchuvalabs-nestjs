
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export enum Role {
    Inversor = 'inversor',
    Agricultor = 'agricultor',
    Comprador = 'comprador',
    Agronomo = 'agronomo',
    Proveedor = 'proveedor'
  }

export class CreateUserDto {
    @IsString()
    fullName: string;

    @IsString()
    @IsEmail()
    email: string;


    @IsNotEmpty({ message: 'La wallet es obligatoria' })
    @Matches(/^0x[a-fA-F0-9]{40}$/, {
      message: 'La wallet debe comenzar con 0x y tener 40 caracteres hexadecimales adicionales'
    })
    wallet: string;

    @IsOptional() 
  @IsEnum(Role) 
  role?: Role;
}
