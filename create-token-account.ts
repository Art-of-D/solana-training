import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

async function main() {
  const connection = new Connection(clusterApiUrl("devnet"));

  const sender = getKeypairFromEnvironment("SECRET_KEY");

  console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}`
  );

  //Add token mint account from create-token-mint.ts
  const tokenMintAccount = new PublicKey(
    "2kCcDTCBkaGZdD3EnSbVXsVDXyrkZGEp2W2dHGRQB6Mc"
  );

  // Subtitute in a recipient token account or use next
  const recipient = new PublicKey(
    "Hxsgo2tPiu6967VUaEquk232riDKkaqK89wBvdSCgjH7"
  );

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient
  );

  console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

  const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
  );

  console.log(`✅ Created token Account: ${link}`);
}

main().catch((error) => {
  console.error(error);
});
