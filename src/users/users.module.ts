import { PersistenceModule } from './../libs/persistance/persistance.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { HashService } from './hash.service';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';

@Module({
 imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
], 
  controllers: [UsersController],
  providers: [
    UsersService,
    HashService,
    AuthService,
  MailService],
  exports: [UsersService],
})
export class UsersModule {}
