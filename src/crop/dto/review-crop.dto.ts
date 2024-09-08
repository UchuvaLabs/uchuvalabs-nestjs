import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';

export class ReviewCropDto {
  @IsNotEmpty()
  @IsMongoId()
  cropId: string;

  @IsNotEmpty()
  @IsBoolean()
  isViable: boolean;
}
