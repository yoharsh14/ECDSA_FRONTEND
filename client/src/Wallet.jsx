import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import * as utils from "ethereum-cryptography/utils";
function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = utils.toHex(secp.getPublicKey(privateKey)).slice(-20);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input
          placeholder="Type in a Private key"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>
      <div className="address">Address: {address}</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

// private key
//feb0b980e931138a63563a6ec73fca1bf527f4cb10f3c12b276902b9825d3432
//e8cf8e2bcb1db95f9caa087fe195805be72bb314bf08bf35ef37b3f5b46fa347
//0bf90c610e6efad9b51803f10b26891863a569ac2c6b3c753935e5322823f43c
