import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
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
    wallet: string;

    @IsEnum(['inversor', 'minicultivador', 'comprador', 'agronomo', 'proveedor'])
    role: string;
}
