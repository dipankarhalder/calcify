import { JWK } from 'node-jose';
import jose from "./jose";

const keys = {
  private: '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIEowIBAAKCAQEAx2vT0NEMwr4nS+h//2R6PiNBpjNqzRl1OZnsDan/nSGW+LLk\n' +
    '7Krd54fWbkyvSs0kNwm5jD5to+eav2yxYBjTgmLGCumbtwsLiW68tui7s2cTTlEE\n' +
    'TBCvb6z9zKZ1D9VT9i9durq19hUc+GAqYp143vnYX99kWQqKpsyewqPdbd39XnQU\n' +
    'i638z3AlJGBcaSXDg1J8D5mUv8z3VlC62XRrzlRut9M3ixTrGiVRX/JwEtg2fCM4\n' +
    'kWma5x6ecYQPWpVE4Hxo42EsMhRkum8oAjF8TcQ7OwpUjVlSYIr9wyw3XZUd730v\n' +
    'PpdOm9XXEjM4SJ4ztE676LIyJAGnVp7A1RcQSwIDAQABAoIBAHfjs2wOwgUyHJ3e\n' +
    'IVWBKpzAxW8N6l9ztq3yg5+TXEEzOHg71LUT5GSVnayiHaByxBrylcJipbesPbRn\n' +
    'vBtx0XbJuxZEa4EX+s+c64drU6z/gvPKcTLptQ8GiW7HhAkIz3lp8IeaSFqxRsFr\n' +
    'zw+KbGhg/FxnCQUe+UxeJ/QMX8r0YvmBlhF0jsEr/e96ScBJ9qNatTnRSmjYQVcU\n' +
    'LxAdfZvl7H4BRrXlXQ6ilb61tO+/7urwb5CTRunxbrqP7F7SnYgNncYdx6tAU3Ml\n' +
    '8YN42d/fFX8bujBvkKbDUI6SGsXzIjXIJ6KqnSfEcS3a52/W1RZJlcF1VYo8jTO5\n' +
    'MltwPMECgYEA4hRM7nWcGinqxDJJAV2FhRLoPi6X3JI6gfsIMwX2YbrBBTd/YkFL\n' +
    'QLXlb29c3bYIa6sk9XKVVB3L2EJcBBCSLtQrAyNBpeKDhvcYuDmYGwUGgYjEUUON\n' +
    'TtLzdllEYFBUVFMqeyZ5/hbEl6WDQgTDPhzhBAmFGCdqD7UKbmnJIy8CgYEA4dBV\n' +
    'ubBUGynKnxdBWOXCtqIz605HFbpDif8w/u+II2GtqMl6NyvfelYdBxjLS4ffB+0D\n' +
    'tCtxGkIEl6LsiMa3yo5nFk0e956t08/1rBIiklkpFJ7gikCjGUqdxVx6QhPeO6Xs\n' +
    'hzemzU68+4Yuz13N7rJqKEi6E7Mu6KptJEh2DaUCgYEAvGN0M+T3Hmo9gh3w7d1T\n' +
    'jK9TrbU/wIJtlLBtha77PzbS7xju4h5MqfCo7nHa7blpTOcBVjKUMtLdcSji6lQw\n' +
    'rCsKaIPxiVy2gznWdHUxxZorcLdZ9+mVj9CDJeR+8M8fZmEi7hoC3/NzAHbgaJv1\n' +
    'YgXIj4erS5RUciBHP/iQresCgYByLhfKpsBAY+dSfj3Kp5LHKkk6aABFmkNgWar6\n' +
    'nT+nNFLND+M+Vm7Puw8+cWkKLg+2QEApL/Ymos8TpYwYtPJl949klWZdKt0WRwcg\n' +
    'FKNqgK7nAFblUT2nIjWYf+RJ2SX73zA0Rw2OroucWwL8U6A3W/uVlwCPyYCkoNhD\n' +
    'Cmi3CQKBgHkTL+lOXqqwPox/4C/3UaUex62Cxo0Ws+Wf7mxOncjMQGo8iXP/f4q1\n' +
    'm3B3EeJrODBM/KNE/ASdSxIt3B7aI1K2pXspFbDGcVx9nIFap48QljLL468G8W99\n' +
    'AB083NxMg9t0k1YA43UWyzLqhgCFaVoyG+QTfV67ec+6Hl99EsDG\n' +
    '-----END RSA PRIVATE KEY-----',
  public: '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2vT0NEMwr4nS+h//2R6\n' +
    'PiNBpjNqzRl1OZnsDan/nSGW+LLk7Krd54fWbkyvSs0kNwm5jD5to+eav2yxYBjT\n' +
    'gmLGCumbtwsLiW68tui7s2cTTlEETBCvb6z9zKZ1D9VT9i9durq19hUc+GAqYp14\n' +
    '3vnYX99kWQqKpsyewqPdbd39XnQUi638z3AlJGBcaSXDg1J8D5mUv8z3VlC62XRr\n' +
    'zlRut9M3ixTrGiVRX/JwEtg2fCM4kWma5x6ecYQPWpVE4Hxo42EsMhRkum8oAjF8\n' +
    'TcQ7OwpUjVlSYIr9wyw3XZUd730vPpdOm9XXEjM4SJ4ztE676LIyJAGnVp7A1RcQ\n' +
    'SwIDAQAB\n' +
    '-----END PUBLIC KEY-----'
};

const makeKey = pem => JWK.asKey(pem, 'pem');

let jwKeys = async () => await Promise.all([
  makeKey(keys.private),
  makeKey(keys.public)
]);

export let generate = async (payload, validUpToInMinutes = 60 * 24 * 30) => {
  let keys = await jwKeys();
  const { /*encrypt,*/ createSign } = jose(...keys);
  //encrypted = await encrypt(raw);
  // return encrypted;

  let sign = await createSign(payload, validUpToInMinutes);

  return sign;
};

export let verify = async (token) => {
  let keys = await jwKeys();
  const { /*decrypt,*/ verifySign } = jose(...keys);

  //decrypted = await decrypt(token)
  // return decrypted;

  let vSign = await verifySign(token);
  return vSign;
};

export let encrypt = async (token) => {
  let keys = await jwKeys();
  const { /*decrypt,*/ encrypt } = jose(...keys);

  //decrypted = await decrypt(token)
  // return decrypted;

  let vSign = await encrypt(token);
  return vSign;
};

export let generateEncrypt = async (payload, validUpToInMinutes = 30 * 24 * 60) => {
  let keys = await jwKeys();
  const { encrypt, createSign } = jose(...keys);
  let sign = await createSign(payload, validUpToInMinutes);

  let encrypted = await encrypt(sign);
  return encrypted;
};


export let verifyDecrypt = async (token) => {
  let keys = await jwKeys();
  const { decrypt, verifySign } = jose(...keys);

  let decrypted = await decrypt(token)

  let vSign = await verifySign(decrypted);
  return vSign;
};