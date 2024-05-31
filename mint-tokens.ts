import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

async function main() {
  const connection = new Connection(clusterApiUrl("devnet"));

  // Our token has two decimal places
  const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

  const sender = getKeypairFromEnvironment("SECRET_KEY");

  // Substitute in your token mint account from create-token-mint.ts
  const tokenMintAccount = new PublicKey(
    "2kCcDTCBkaGZdD3EnSbVXsVDXyrkZGEp2W2dHGRQB6Mc"
  );

  // Subtitute in a recipient token account you just made
  const recipientAssociatedTokenAccount = new PublicKey(
    "Fneh7xrAyQaUq1osQG47qiQ9KdmtkcReQSg1BH75Zv6P"
  );

  const transactionSignature = await mintTo(
    connection,
    sender,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    sender,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
  );

  const link = getExplorerLink("transaction", transactionSignature, "devnet");

  console.log(`✅ Success! Mint Token Transaction: ${link}`);
}

main().catch((error) => {
  console.error(error);
});

// npx ts-node mint-tokens.ts
