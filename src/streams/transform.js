import { Transform } from "stream";

const transform = async () => {
  const reverseFn = new Transform({
    transform(chunk, encoding, callback) {
      const input = chunk.toString().trim();

      const reversed = input.split("").reverse().join("");

      callback(null, reversed);
    },
  });

  console.log("Please, type your text below.");

  process.stdin.pipe(reverseFn).pipe(process.stdout);
};

await transform();
