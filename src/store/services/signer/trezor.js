import { Signer, providers, utils } from "ethers";
import TrezorConnect from "trezor-connect";

import { NETWORK_URL } from "../../../config/url";
import { addMethodsToSigner } from "./index";

const defaultDPath = "m/44'/60'/0'/0";

export class TrezorSigner extends Signer {
    constructor() {
        super();
        const networkId = 8888;
        this.chainId = networkId;
        this.provider = new providers.JsonRpcProvider(NETWORK_URL, {
            chainId: networkId
        });
        window.signer = { instance: this, type: "hardwareWallet" };
        addMethodsToSigner(this);
    }

    getPublicKey = (path = defaultDPath) => {
        return new Promise(async (resolve, reject) => {
            let result = await TrezorConnect.getPublicKey({
                path
            });
            if (result.success) {
                resolve(result.payload);
            } else {
                console.log(result);
                reject(result.payload.error);
            }
        });
    };

    getAddress = (path = defaultDPath) => {
        return new Promise(async (resolve, reject) => {
            let result = await TrezorConnect.getAddress({
                path,
                coin: "eth"
            });
            if (result.success) {
                resolve(result.payload.address);
            } else {
                console.log(result);
                reject(result.payload.error);
            }
        });
    };

    signMessage = async message => {
        return new Promise(async (resolve, reject) => {
            let result = await TrezorConnect.signMessage({
                path: defaultDPath,
                message
            });
            console.log(result);
            if (result.success) {
                resolve(result.payload.signature);
            } else {
                console.error("Error:", result.payload.error); // error message
                reject(result.payload.error);
            }
        });
    };

    sign = async transaction => {
        let tx = transaction;

        console.log(tx);

        tx.value = utils.hexlify(tx.value);
        tx.gasPrice = utils.hexlify(tx.gasPrice);
        tx.gasLimit = utils.hexlify(tx.gasLimit);
        tx.nonce = tx.nonce ? utils.hexlify(tx.nonce) : utils.hexlify(0);

        console.log(tx);

        let result = await TrezorConnect.ethereumSignTransaction({
            path: defaultDPath,
            transaction: tx
        });

        console.log(result);

        if (result.success) {
            let sig = {
                v: parseInt(result.payload.v.substring(2), 16),
                r: result.payload.r,
                s: result.payload.s
            };

            console.log(sig);

            let serializedTransaction = await utils.serializeTransaction(
                tx,
                sig
            );

            return serializedTransaction;
        }

        throw new Error(result.payload.error);
    };

    sendTransaction = async transaction => {
        let signedTx = await this.sign(transaction);

        let a = utils.parseTransaction(signedTx);
        console.log(a);

        return this.provider.sendTransaction(signedTx);
    };
}
