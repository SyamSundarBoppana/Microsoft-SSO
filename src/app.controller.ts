import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AzureADService } from "./app.service"
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AzureActiveDirectoryGuard } from 'nest-azure-ad-jwt-validator';

@ApiTags('Azure AD')
@Controller('azure-ad')
export class AzureADController {
  constructor(private readonly azureAdService: AzureADService) {}

  @Get('/access-token')
  getAzureToken() {
    return this.azureAdService.getAzureToken();
  }

  @Get('/user')
  @ApiBearerAuth('access-token')
  @UseGuards(AzureActiveDirectoryGuard)
  getMicrosoftUsers() {
    return this.azureAdService.getMicrosoftUsers();
  }

  @Get('/user/:id')
  @ApiBearerAuth('access-token')
  @UseGuards(AzureActiveDirectoryGuard)
  getMicrosoftUsersbyId(@Param('id') id: string) {
    return this.azureAdService.getMicrosoftUsersbyId(id);
  }
}