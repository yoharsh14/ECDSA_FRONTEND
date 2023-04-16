const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const utils = require("ethereum-cryptography/utils");
app.use(cors());
app.use(express.json());

const balances = {
  "c216ef88b4f4ce0f7060": 100,
  "b238b82a2ad88006dd5e": 50,
  "2c9919ab02916f941056": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  //TOD: get a signature from client-side application
  // revcover the public address from the signature
  const { sender, recipient, amount, signature, messageHash } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);
  const publicKey = secp.getPublicKey(sender);
  const a = async () => {
    // const signature = await secp.sign(messageHash, privateKey);
    const isSigned = secp.verify(signature, messageHash, publicKey);
    console.log(`${isSigned}`);
    return isSigned;
  };
  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
