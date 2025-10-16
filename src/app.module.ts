// Modulos Externos
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ormConfig from '../ormconfig'; // Import your TypeORM configuration

// Modulos Internos
import { validate } from '../config/env.validation';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),

    TypeOrmModule.forRoot(ormConfig as any), // Use the imported configuration
    HealthModule,
    UsersModule,
    AuthModule,
  ],
})

export class AppModule { }
