import { Transform } from 'class-transformer';
import { IsNotEmpty, Length, Matches } from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty({ message: 'La wallet es obligatoria' })
    @Matches(/^0x[a-fA-F0-9]{40}$/, {
      message: 'La wallet debe comenzar con 0x y tener 40 caracteres hexadecimales adicionales'
    })
    wallet: string;

    @IsNotEmpty({ message: 'El OTP es obligatorio' })
    @Length(6, 6, { message: 'El OTP debe tener exactamente 6 caracteres' })
    @Transform(({ value }) => value.toUpperCase(), { toClassOnly: true })
    otp: string;
}
