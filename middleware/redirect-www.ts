import { defineEventHandler, H3Event } from "h3";

export default defineEventHandler((event: H3Event) => {
  const host = event.node.req.headers.host;

  if (host && host.startsWith("www.")) {
    const newHost = host.replace(/^www\./, "");
    const newUrl = `https://${newHost}${event.node.req.url}`;
    event.node.res.writeHead(301, { Location: newUrl });
    event.node.res.end();
  }
});
