# hipocrat-wallet-sdk

## start

- `$ npm install`

Hipocrat wallet sdk which supports bitcoin, its layer2(ION, liquid, lightning) and cryptographic tool

## BtcWallet

- [generate HD wallet mnemonic](https://github.com/hipocrat-dao/hipocrat-wallet-sdk/blob/develop/test/BtcWallet.spec.ts#L5)

- [derive BIP32 account From mnemonic](https://github.com/hipocrat-dao/hipocrat-wallet-sdk/blob/develop/test/BtcWallet.spec.ts#L15)

- [derive child BIP32 account From parent BIP32 account](https://github.com/hipocrat-dao/hipocrat-wallet-sdk/blob/develop/test/BtcWallet.spec.ts#L27)

- [generate bitcoin address from BIP32 account](https://github.com/hipocrat-dao/hipocrat-wallet-sdk/blob/develop/test/BtcWallet.spec.ts#L40)

- [encrypt & decrypt mnemonic to store vault securely](https://github.com/hipocrat-dao/hipocrat-wallet-sdk/blob/develop/test/BtcWallet.spec.ts#L55)

## IonDid

- [generate Ion key pair based on secp256k1, which is compatible with bitcoin](https://github.com/hipocrat-dao/hipocrat-wallet-sdk/blob/develop/test/IonDid.spec.ts#L5)

- [create Ion DID to anchor](https://github.com/hipocrat-dao/hipocrat-wallet-sdk/blob/develop/test/IonDid.spec.ts#L22)

- [get Ion DID uri(long&short)](https://github.com/hipocrat-dao/hipocrat-wallet-sdk/blob/develop/test/IonDid.spec.ts#L56)

- [anchor Ion DID on Ion node(will be published on bitcoin)](https://github.com/hipocrat-dao/hipocrat-wallet-sdk/blob/develop/test/IonDid.spec.ts#L92)

- [get resolved(anchored or published) Ion Did](https://github.com/hipocrat-dao/hipocrat-wallet-sdk/blob/develop/test/IonDid.spec.ts#L126)

- [convert json web key to hex key format](https://github.com/hipocrat-dao/hipocrat-wallet-sdk/blob/develop/test/IonDid.spec.ts#L140)

## RareData

- [encrypt & decrypt data following ECIES(AES-GCM with temporary ECDH derived key)](https://github.com/hipocrat-dao/hipocrat-wallet-sdk/blob/develop/test/RareData.spec.ts#L5)

- [encrypt & decrypt data following AES-GCM with fixed ECDH derived key(prevent SPOF)](https://github.com/hipocrat-dao/hipocrat-wallet-sdk/blob/develop/test/RareData.spec.ts#L21)
