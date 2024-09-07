import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistance/db-config';
import { PersistenceModule } from './libs/persistance';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
     PersistenceModule,
    UsersModule,
    AuthModule
  
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
