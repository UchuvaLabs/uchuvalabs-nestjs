import { Module } from '@nestjs/common';
import { CropService } from './crop.service';
import { CropController } from './crop.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Crop, CropSchema } from './entities/crop.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Crop.name, schema: CropSchema } 
    ]),
  ],
  controllers: [CropController],
  providers: [CropService],
})
export class CropModule {}
