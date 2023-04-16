const secp = require("ethereum-cryptography/secp256k1");
const utils = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const privateKey = secp.utils.randomPrivateKey();

console.log(`private Key: ${utils.toHex(privateKey)}`);

const publicKey = secp.getPublicKey(privateKey);

console.log(`public Key: ${utils.toHex(publicKey)}`);
console.log(`address: ${utils.toHex(publicKey).slice(-20)}`);
// const privateKey = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
const messageHash =
  "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28";
// const publicKey = secp.getPublicKey(privateKey);
const call = async () => {
  const signature = await secp.sign(messageHash, privateKey);
  console.log(`${utils.toHex(signature)}`)
  const isSigned = secp.verify(signature, messageHash, publicKey);
  console.log(`${isSigned}`);
};

call();
