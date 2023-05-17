import express from "express";
import { RouteType } from "./interfaces/route-type";
import cors from "cors";

export class App {
  public app: express.Application = express();

  constructor(routes: RouteType[]) {
    this.middleware();
    this.routes(routes);
  }

  private middleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes(routes: RouteType[]) {
    routes.forEach(({ path, router }) => {
      this.app.use(path || "/", router);
      console.log(`Path ${path} initialized!`);
    });
  }

  public listen(port: number, message: string) {
    this.app.listen(port, () => console.log(message));
  }
}
