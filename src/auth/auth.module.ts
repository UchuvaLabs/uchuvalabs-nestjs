import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { HashService } from 'src/users/hash.service';
import { UsersService } from 'src/users/users.service';


@Module({
  imports: [
    UsersModule,
    PassportModule.register({session:true}),
    MongooseModule.forFeature([{
        name: User.name,
        schema: UserSchema
    }])
], 
  controllers: [],
  providers: [
    AuthService,
    HashService,
    UsersService
  ],
})
export class AuthModule {}
