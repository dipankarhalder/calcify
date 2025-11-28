import { JWE, JWS } from 'node-jose';
import moment from "moment";

import { encode, decode } from "./base64";
// const { encode, decode } = require('./base64');

const config = {
    iss: "Calcify"
};

const jose = (privateKey, publicKey) => {
    async function encrypt(raw) {
        if (!raw) throw new Error('Missing raw data.');
        const buffer = Buffer.from(JSON.stringify(raw));
        const encrypted = await JWE.createEncrypt({ format: 'compact', zip: true }, publicKey)
            .update(buffer).final();
        return encode(encrypted);
    };

    async function decrypt(encrypted) {
        if (!encrypted) throw new Error('Missing encrypted data.');
        const decoded = decode(encrypted);
        const { payload } = await JWE.createDecrypt(privateKey)
            .decrypt(decoded);
        return JSON.parse(payload);
    };

    async function createSign(raw, validUpToInMinutes = 60) {
        if (!raw) throw new Error('Missing raw data.');
        const buffer = Buffer.from(JSON.stringify(raw));
        const encrypted = await JWS.createSign({
            //opts: { protect: true },
            format: 'compact',
            alg: 'PS256',
            fields: { /*typ: 'JWT',*/ exp: moment().add(validUpToInMinutes, "minutes"), "iss": config.iss }
        }, privateKey).update(buffer).final();
        return encode(encrypted);
    };

    async function verifySign(encrypted) {
        if (!encrypted) throw new Error('Missing encrypted data.');
        const decoded = decode(encrypted);
        var opts = {
            // allowEmbeddedKey: true,
            handlers: {
                "exp": {
                    complete: function (jws) {
                        // {jws} is the JWS verify output, post-verification
                        jws.header.exp = moment(jws.header.exp);
                    }
                }
            }
        };
        const result = await JWS.createVerify(publicKey, opts)
            .verify(decoded);

        //console.log(result);

        let err = new Error();
        err.name = "INVALID_TOKEN";

        if (moment() > result.header.exp) {
            err.message = "exp Date has been expired";
            err.encrypted = encrypted;
            throw err;
        }

        if (config.iss !== result.header.iss) {
            err.message = "Invalid issuer";
            throw err;
        }


        return JSON.parse(result.payload);
    }

    return { encrypt, decrypt, createSign, verifySign };
};

export default jose;