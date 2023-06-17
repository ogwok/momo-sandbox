const MomoSandbox = require('momosandbox');

const callbackHost = 'https://webhook.site/318e088e-2f48-4ad4-8974-7615436d637a';
const primaryKey = 'your-primary-key';

const momoSandbox = new MomoSandbox(callbackHost, primaryKey);

momoSandbox.generateUserCredentials()
  .then(() => {
    console.log('User credentials generated successfully:');
    console.log('userId:', momoSandbox.userId);
    console.log('userApiKey:', momoSandbox.userApiKey);
    console.log('callbackHost:', momoSandbox.callbackHost);
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
