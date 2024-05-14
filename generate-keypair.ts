import { Keypair } from "@solana/web3.js";
import { addKeypairToEnvFile } from "@solana-developers/helpers";
import fs from "fs";

const ENV_PATH = "./.env";
const keypair = Keypair.generate();
if (keypair) {
  fs.writeFileSync(ENV_PATH, "");
}
addKeypairToEnvFile(keypair, "SECRET_KEY", ENV_PATH);

console.log(`The public key is: `, keypair.publicKey.toBase58());
console.log(`The secret key is: `, keypair.secretKey);
console.log(`✅ Finished!`);
