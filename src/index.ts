import Fastify from "fastify";
import closeWithGrace from "close-with-grace";
import { summarize } from "src/lib/summarize.js";

const app = Fastify({
  logger: {
    level: "info",
    transport:
      process.env.NODE_ENV === "development"
        ? { target: "pino-pretty" }
        : undefined,
  },
});

app.get("/", function () {
  return { hello: "world" };
});

app.post("/summarize", async function (request, reply) {
  const { input } = request.body as { input: string };
  const stream = await summarize(input);
  reply.header("Content-Type", "application/octet-stream");
  return reply.send(stream);
});

app.listen({ port: 8080, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.log.info(`server listening on ${address}`);
});

closeWithGrace(async ({ signal, err }) => {
  if (err) app.log.error({ err }, "server closing due to error");
  else app.log.info(`${signal} received, server closing`);

  await app.close();
});
