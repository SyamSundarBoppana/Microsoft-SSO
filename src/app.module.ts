import { Module } from '@nestjs/common';
import { AzureADController } from './app.controller';
import { AzureADService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NestAzureAdJwtValidatorModule } from 'nest-azure-ad-jwt-validator';


@Module({
  imports: [
    ConfigModule.forRoot(),
    NestAzureAdJwtValidatorModule.forRoot({
    apps: [
      {
        tenantId: process.env.AZURE_AD_TENANTID,
        audienceId: process.env.AZURE_AD_CLIENTID,
      },
    ],
    tokenHeader: 'authorization', // The Header in which the jwt appears defaults to 'authtoken' by default.
  }),],
  controllers: [AzureADController],
  providers: [AzureADService],
})
export class AppModule { }