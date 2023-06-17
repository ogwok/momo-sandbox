# MomoSandbox

MomoSandbox is an npm package that provides a convenient way to generate user credentials for the MTN Mobile Money API sandbox environment. It automates the process of creating an API user, confirming the user's existence, and generating an API key.

## Installation

To use MomoSandbox in your Node.js project, you can install it via npm:

```bash
npm install momosandbox
```
Alternatively, you can use it directly with npx:

```bash
npx momo-sandbox --callback-host <callbackHost> --primary-key <primaryKey>
```

Replace **`<callbackHost>`** with the URL of your callback host and **`<primaryKey>`** with your actual MTN Mobile Money API primary or secondary key.

## Usage

To generate user credentials using the command-line interface:

```bash
npx momo-sandbox --callback-host https://webhook.site/318e088e-2f48-4ad4-8974-76154***** --primary-key 4757******
```

Make sure to replace **`https://webhook.site/318e088e-2f48-4ad4-8974-761*****`** with your actual callback host URL and **`4757******`** with your MTN Mobile Money API primary key.

The generated user credentials will be displayed in the console.

## API

For programmatic usage, you can import the MomoSandbox class from the package and use it as follows:

```bash
const MomoSandbox = require('momosandbox');

const callbackHost = 'your-callback-host-url';
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
```

Make sure to replace **`'your-primary-key'`** with your actual MTN Mobile Money API primary key.

## License
This project is licensed under the MIT License. 