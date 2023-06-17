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

  createApiUser(UUID) {
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

    return axios(options);
  }

  confirmApiUser(UUID) {
    const options = {
      method: 'GET',
      url: `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${UUID}`,
      headers: {
        'X-Reference-Id': UUID,
        'Ocp-Apim-Subscription-Key': this.primaryKey,
      },
    };

    return axios(options);
  }

  createUserApiKey(UUID) {
    const options = {
      method: 'POST',
      url: `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${UUID}/apikey`,
      headers: {
        'X-Reference-Id': UUID,
        'Ocp-Apim-Subscription-Key': this.primaryKey,
      },
    };

    return axios(options)
      .then(response => response.data.apiKey);
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
      console.error('An error occurred:', error);
    }
  }
}

program
  .option('--callback-host <callbackHost>', 'The callback host')
  .option('--primary-key <key>', 'The primary key')
  .parse(process.argv);

const { callbackHost, primaryKey } = program.opts();

if (!callbackHost || !primaryKey) {
  console.error('Please provide the callback host and primary key.');
  program.help();
  process.exit(1);
}

const momoSandbox = new MomoSandbox(callbackHost, primaryKey);
momoSandbox.generateUserCredentials();
