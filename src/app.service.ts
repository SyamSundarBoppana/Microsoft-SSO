import { Injectable } from '@nestjs/common';

@Injectable()
export class AzureADService {
  async getAzureToken() {
    try {
      const tenantId = process.env.AZURE_AD_TENANTID;
      const endpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
      const encodeParams = new URLSearchParams();
      encodeParams.append('client_id', process.env.AZURE_AD_CLIENTID);
      encodeParams.append(
        'client_secret',
        process.env.AZURE_AD_CLIENT_SECRET_VALUE,
      );
      encodeParams.append('scope', `${process.env.AZURE_AD_CLIENTID}/.default`);
      encodeParams.append('grant_type', 'client_credentials');
      const response = await fetch(endpoint, {
        method: 'POST',
        body: encodeParams,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return await response.json();
    } catch (err) {
      return err;
    }
  }

  async getGraphApiAccessToken() {
    const tenantId = process.env.AZURE_AD_TENANTID;
    const endpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const encodeParams = new URLSearchParams();
    encodeParams.append('client_id', process.env.AZURE_AD_CLIENTID);
    encodeParams.append(
      'client_secret',
      process.env.AZURE_AD_CLIENT_SECRET_VALUE,
    );
    encodeParams.append('scope', 'https://graph.microsoft.com/.default');
    encodeParams.append('grant_type', 'client_credentials');
    const response = await fetch(endpoint, {
      method: 'POST',
      body: encodeParams,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return await response.json();
  }

  async getMicrosoftUsers() {
    try {
      const res = await this.getGraphApiAccessToken();
      const users = await fetch('https://graph.microsoft.com/v1.0/users', {
        headers: {
          Authorization: `Bearer ${res?.access_token}`,
        },
      });
      return await users.json();
    } catch (err) {
      return err;
    }
  }

  async getMicrosoftUsersbyId(id: string) {
    try {
      const res = await this.getGraphApiAccessToken();
      const users = await fetch(
        'https://graph.microsoft.com/v1.0/users/' + id,
        {
          headers: {
            Authorization: `Bearer ${res?.access_token}`,
          },
        },
      );
      return await users.json();
    } catch (err) {
      return err;
    }
  }
}