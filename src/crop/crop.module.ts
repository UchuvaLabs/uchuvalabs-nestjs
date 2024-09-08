import { Module } from '@nestjs/common';
import { CropService } from './crop.service';
import { CropController } from './crop.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Crop, CropSchema } from './entities/crop.entity';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { HashService } from 'src/users/hash.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Crop.name, schema: CropSchema },
      { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [CropController],
  providers: [CropService,
    UsersService,
  HashService],
})
export class CropModule {}
