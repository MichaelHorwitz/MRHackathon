import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsController } from './utils/utils.controller';
import { UtilsService } from './utils/utils.service';
import { HealthCheckService, HttpHealthIndicator, TerminusModule } from '@nestjs/terminus';
import { UtilsModule } from './utils/utils.module';
import { MonitoredDestinationModule } from './monitored-destination/monitored-destination.module';
import { NotifsModule } from './notifs/notifs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
  UtilsModule,
  TerminusModule,
  MonitoredDestinationModule,
  NotifsModule

  ],
  controllers: [AppController],
  providers: [AppService],
  // providers: [AppService, UtilsService, HealthCheckService, HttpHealthIndicator],
})  
export class AppModule {}
