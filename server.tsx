import { FileSystemRouter } from "bun";
import { renderToReadableStream } from "react-dom/server";

export default {
  port: 9162,
  async fetch(req: Request) {
    const router = new FileSystemRouter({
      dir: process.cwd() + "/pages",
      style: "nextjs",
    });
    const route = router.match(req);
    console.log(route);
    const { default: Root } = await import(route.filePath);
    return new Response(
      await renderToReadableStream(<Root {...route.params} />)
    );
  },
};
