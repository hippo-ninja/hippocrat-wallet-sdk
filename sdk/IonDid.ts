import ION from '@decentralized-identity/ion-tools';
import { Secp256k1KeyPair } from '@transmute/did-key-secp256k1';
import keyto from '@trust/keyto';
import IonService from './models/IonService';
import JsonWebKey2020 from './models/JsonWebKey2020';
import IonDidModel from './models/IonDidModel';
import IonDidResolved from './models/IonDidResolved';
import BIP32Interface from './models/BIP32Interface';

class IonDid {
  // generateKeyPair with key of btcAccount
  static generateKeyPair = async (ionAccountPotential : BIP32Interface)
  : Promise<JsonWebKey2020> => {
    const keyPair : Secp256k1KeyPair = await Secp256k1KeyPair
    .generate({
      secureRandom: () => ionAccountPotential.privateKey as Buffer
    });
    const jsonWebKeyPair : JsonWebKey2020 = await keyPair.export({
      type: 'JsonWebKey2020' as 'JsonWebKey2020',
      privateKey: true as boolean
    }) as JsonWebKey2020;
    return jsonWebKeyPair;
  } 
  // generate did with public key
  static createDid = async (jsonWebKeyPair : JsonWebKey2020, ionServices?: IonService[])
  : Promise<IonDidModel> => {
    const did : ION.DID = new ION.DID({
      content: {
        // Register the public key for authentication(private key belongs to user)
        publicKeys: [
          {
            id: 'auth-key' as string,
            type: 'EcdsaSecp256k1VerificationKey2019' as 'EcdsaSecp256k1VerificationKey2019',
            publicKeyJwk: jsonWebKeyPair.publicKeyJwk as JsonWebKey,
            purposes: [ 'authentication' ] as string[]
          }
        ] as any[],
        // Register an IdentityHub as a service
        services: ionServices
     }})
     return await did._ops[0];
  }
  // did short uri by instance(only resolvable after did published to ION network)
  static getDidUriShort = async (did: IonDidModel) 
  : Promise<string> => {
    const didForOps : ION.DID = await this._getDidOpsFromModel(did);
    const shortFormUri : string = await didForOps.getURI("short");
    return shortFormUri;
  }
  // did long uri by instance(able to use instantly without anchoring)
  static getDidUriLong = async (did: IonDidModel) 
  : Promise<string> => {
    const didForOps : ION.DID = await this._getDidOpsFromModel(did);
    const longFormUri : string = await didForOps.getURI();
    return longFormUri;
  }
  // submit ion did on bitcoin chain -> default node is run by Microsoft
  static anchorRequest = async (did: IonDidModel) 
  : Promise<IonDidResolved> => {
    const didForOps : ION.DID = await this._getDidOpsFromModel(did);
    const anchorRequestBody : any = await didForOps.generateRequest();
    const anchorRequest : any = new ION.AnchorRequest(anchorRequestBody);
    const anchorResponse : string = await anchorRequest.submit();
    return JSON.parse(anchorResponse);
  }
  // resolve published did if uri in short, unpublished one it in long
  static getDidResolved = async (didUri: string)
  : Promise<IonDidResolved> => {
    const didResolved : IonDidResolved = await ION.resolve(didUri);
    return didResolved;
  }
  // convert privateKeyJwk to hex
  static privateKeyHexFromJwk = async (privateKeyJwk : JsonWebKey) 
  : Promise<string> => {
    return keyto
      .from(
        {
          ...privateKeyJwk,
          crv: 'K-256' as string,
        },
        'jwk' as string
      )
      .toString('blk' as string, 'private' as string) as string;
  }
  // convert publicKeyJwk to hex
  static publicKeyHexFromJwk = async (publicKeyJwk: JsonWebKey) 
  : Promise<string> => {
    return keyto
      .from(
        {
          ...publicKeyJwk,
          crv: 'K-256' as string,
        },
        'jwk' as string
      )
      .toString('blk' as string, 'public' as string) as string;
  };

  private static _getDidOpsFromModel = async (did: IonDidModel)
  : Promise<ION.DID> => {
    const didForOps : ION.DID = new ION.DID({ops: [did] as IonDidModel[]});
    return didForOps;
  }
}

export default IonDid;