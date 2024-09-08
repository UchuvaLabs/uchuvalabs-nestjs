
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    fullName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe contener mayúsculas, minúsculas y números'
    }
    )
    password: string;

    @IsNotEmpty({ message: 'La wallet es obligatoria' })
    @Matches(/^0x[a-fA-F0-9]{40}$/, {
      message: 'La wallet debe comenzar con 0x y tener 40 caracteres hexadecimales adicionales'
    })
    wallet: string;

    
}
