function readInput(): Promise<string | undefined> {
  console.log(
    "Please enter the recipient's public key (or type 'exit' to quit):"
  );

  return new Promise((resolve) => {
    process.stdin.setEncoding("utf-8");

    process.stdin.once("data", (data) => {
      const input = data.toString().trim();
      if (input === "exit") {
        console.log("Exiting...");
        resolve(undefined);
      } else {
        resolve(input);
      }
    });
  });
}

export default readInput;
