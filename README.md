# Example Node Proxy for Deepgram

[![Discord](https://dcbadge.vercel.app/api/server/xWRaCDBtW4?style=flat)](https://discord.gg/xWRaCDBtW4) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg?style=flat-rounded)](CODE_OF_CONDUCT.md)

Despite our SDK working in the browser, our API is restricted by CORS. Our SDK has an option to utilise a REST proxy, so you can still benefit from the SDK's functionality in the browser.

> It is your responsibility to secure this application behind your own authentication, or risk others using your Deepgram credit for their own purpose.

This is an example proxy, built using `http-proxy`. Please consider securing it behind your own client authentication before making it available generally.

## Setup

Clone this repository from [GitHub](https://github.com/deepgram-devs/deepgram-node-proxy).

## Initial installation

Install the dependencies to be able to run this application.

```sh
npm i
```

## Configuring your SSL Identity

Run the following to generate an PKCS12 file, to act as your SSL indentity when making a secure request to the Deepgram API. This does not affect your ability to run this proxy behind it's own SSL.

### Generate 2048-bit RSA private key:

```sh
openssl genrsa -out key.pem 2048
```

### Generate a Certificate Signing Request:

```sh
openssl req -new -sha256 -key key.pem -out csr.csr
```

### Generate a self-signed x509 certificate suitable for use on web servers.

```sh
openssl req -x509 -sha256 -days 365 -key key.pem -in csr.csr -out certificate.pem
```

### Create SSL identity file in PKCS12 as mentioned here

```sh
openssl pkcs12 -export -out certificate.p12 -inkey key.pem -in certificate.pem
```

## Setting up your environment variables

Copy the `sample.env` to `.env` and fill out the variables.

```sh
ALLOWED_ORIGIN=http://localhost:3000 # the origin of the application making the REST requests to Deepgram
PORT=4433 # the port you intend to run your proxy on
DEEPGRAM_API_KEY=5364knj5hgbnipjgp9h490g84h245h524h # your Deepgram API with atleast the usage:write scope
```

## Running locally

```sh
npm run dev
```

# Development and Contributing

Interested in contributing? We ❤️ pull requests!

To make sure our community is safe for all, be sure to review and agree to our
[Code of Conduct](./CODE_OF_CONDUCT.md). Then see the
[Contribution](./CONTRIBUTING.md) guidelines for more information.

# Getting Help

We love to hear from you so if you have questions, comments or find a bug in the
project, let us know! You can either:

- [Open an issue in this repository](https://github.com/deepgram-devs/deepgram-node-proxy/issues/new)
- [Join the Deepgram Discord Community](https://discord.gg/xWRaCDBtW4)
- [Join the Deepgram Github Discussions Community](https://github.com/orgs/deepgram/discussions)
