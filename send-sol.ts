import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  Connection,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import readInput from "./readInput";

const sendSol = async () => {
  const sender = getKeypairFromEnvironment("SECRET_KEY");

  const connection = new Connection(clusterApiUrl("devnet"));
  const SOMEONE_IN_CLASS = await readInput();

  if (typeof SOMEONE_IN_CLASS === "string") {
    console.log(
      `🔑 Loaded our keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}`
    );
    const recipient = new PublicKey(SOMEONE_IN_CLASS);

    console.log(`💸 Attempting to send 0.01 SOL to ${recipient.toBase58()}...`);

    const transaction = new Transaction();

    const sendSolInstruction = SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: recipient,
      lamports: 0.01 * LAMPORTS_PER_SOL,
    });

    transaction.add(sendSolInstruction);

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      sender,
    ]);

    console.log(`✅ Transaction confirmed, signature: ${signature}!`);
  } else {
    console.log(`❌ No input provided. The program will exit.`);
    process.exit(1);
  }
};

sendSol().catch((err) => {
  console.error(err);
  process.exit(1);
});
