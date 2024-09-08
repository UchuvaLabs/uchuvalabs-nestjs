import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateCropStatusDto {
  @IsNotEmpty()
  cropId: Types.ObjectId;

  @IsEnum(['pendiente', 'aceptado'])
  status: 'pendiente' | 'aceptado';
}
