import { ethers } from "ethers";

function newWallet() {
  const wallet = ethers.Wallet.createRandom([]);

  const response = {
    privateKey: wallet.privateKey,
    address: wallet.address,
    mnemonic: wallet._mnemonic().phrase,
  };
  return response;
}
export default { newWallet };
