# MomoSandbox

MomoSandbox is an npm package that provides a convenient way to generate user credentials for the MTN Mobile Money API sandbox environment. It automates the process of creating an API user, confirming the user's existence, and generating an API key.

## Usage

To use MomoSandbox in your project, you can install it via npx:

```bash
npx momo-sandbox --callback-host <callbackHost> --primary-key <primaryKey>
```

Replace **`<callbackHost>`** with the URL of your callback host and **`<primaryKey>`** with your actual MTN Mobile Money API primary or secondary key.

## License
This project is licensed under the MIT License. 