#!/usr/bin/env node

const { program } = require('commander');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

class MomoSandbox {
  constructor(callbackHost, primaryKey) {
    this.callbackHost = callbackHost;
    this.primaryKey = primaryKey;
    this.userId = null;
    this.userApiKey = null;
  }

  generateUUID() {
    return uuidv4();
  }

  async createApiUser(UUID) {
    try {
      const options = {
        method: 'POST',
        url: 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser',
        headers: {
          'X-Reference-Id': UUID,
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': this.primaryKey,
        },
        data: {
          providerCallbackHost: this.callbackHost,
        },
      };

      await axios(options);
    } catch (error) {
      throw new Error(`Failed to create API user: ${error.message}`);
    }
  }

  async confirmApiUser(UUID) {
    try {
      const options = {
        method: 'GET',
        url: `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${UUID}`,
        headers: {
          'X-Reference-Id': UUID,
          'Ocp-Apim-Subscription-Key': this.primaryKey,
        },
      };

      await axios(options);
    } catch (error) {
      throw new Error(`Failed to confirm API user: ${error.message}`);
    }
  }

  async createUserApiKey(UUID) {
    try {
      const options = {
        method: 'POST',
        url: `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${UUID}/apikey`,
        headers: {
          'X-Reference-Id': UUID,
          'Ocp-Apim-Subscription-Key': this.primaryKey,
        },
      };

      const response = await axios(options);
      const userApiKey = response.data.apiKey;

      if (userApiKey) {
        return userApiKey;
      } else {
        throw new Error('Failed to create user API key');
      }
    } catch (error) {
      throw new Error(`Failed to create user API key: ${error.message}`);
    }
  }

  async generateUserCredentials() {
    try {
      const UUID = this.generateUUID();
      await this.createApiUser(UUID);
      await this.confirmApiUser(UUID);
      this.userApiKey = await this.createUserApiKey(UUID);

      // Display the results
      this.userId = UUID;
      console.log('userId:', this.userId);
      console.log('userApiKey:', this.userApiKey);
      console.log('callbackHost:', this.callbackHost);
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }
}

program
  .requiredOption('--callback-host <callbackHost>', 'The callback host')
  .requiredOption('--primary-key <key>', 'The primary key')
  .parse(process.argv);

const { callbackHost, primaryKey } = program;

const momoSandbox = new MomoSandbox(callbackHost, primaryKey);
momoSandbox.generateUserCredentials();
