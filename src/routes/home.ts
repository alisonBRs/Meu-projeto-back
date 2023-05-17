import { Router } from "express";
import { RouteType } from "../interfaces/route-type";
import { homeController } from "../controllers/home.controller";

export class Home implements RouteType {
  public path = "/";
  public router = Router();

  constructor() {
    this.router.get("/", homeController.get);
    this.router.get("/:id", homeController.getById);
    this.router.post("/", homeController.post);
    this.router.patch("/:id", homeController.update);
    this.router.delete("/:id", homeController.delete);

    this.router.post("/service/:id", homeController.postService);
    this.router.delete("/service/:id/:id", homeController.deleteService);
    this.router.delete("/service/:id", homeController.deleteAllServices);
    this.router.patch("/service/:id/:id", homeController.updateService);
  }
}
