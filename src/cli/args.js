const parseArgs = () => {
  console.log("Received request to parse command line arguments.");

  const args = process.argv.slice(2);

  const result = [];

  for (let i = 0; i < args.length; i++) {
    const current = args[i];

    if (!current.startsWith("--")) return;

    const argument = current.slice(2);
    const number = args[i + 1];

    result.push(`${argument} is ${number}`);
    i++;
  }

  console.log("Parsed command line arguments: ", result.join(", "));

  console.log("Environment variables were parsed successfully.");
};

parseArgs();
