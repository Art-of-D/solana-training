import { Keypair } from "@solana/web3.js";

const keypair = Keypair.fromSeed(
  Buffer.from("askjdfhkadskfhajksdhfjkasdflarty")
);
console.log(`The public key is: `, keypair.publicKey.toBase58());
