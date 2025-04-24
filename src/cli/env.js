const parseEnv = () => {
  console.log("Received request to parse environment variables.");

  const result = Object.entries(process.env)
    .filter(([key]) => key.startsWith("RSS_"))
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");

  console.log("Parsed environment variables: ", result);

  console.log("Environment variables were parsed successfully.");
};

parseEnv();
