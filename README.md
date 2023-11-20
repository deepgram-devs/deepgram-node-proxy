1. Generate 2048-bit RSA private key:

```sh
openssl genrsa -out key.pem 2048
```

2. Generate a Certificate Signing Request:

```sh
openssl req -new -sha256 -key key.pem -out csr.csr
```

3. Generate a self-signed x509 certificate suitable for use on web servers.

```sh
openssl req -x509 -sha256 -days 365 -key key.pem -in csr.csr -out certificate.pem
```

4. Create SSL identity file in PKCS12 as mentioned here

```sh
openssl pkcs12 -export -out certificate.p12 -inkey key.pem -in certificate.pem
```
