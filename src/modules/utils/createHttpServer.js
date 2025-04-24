import { createServer as createServerHttp } from "http";

export function createHttpServer() {
  return createServerHttp((_, res) => {
    res.end("Request accepted");
  });
}
