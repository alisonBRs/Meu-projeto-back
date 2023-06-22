import { Request, Response } from "express";
import { UserPostType, Services, homeService } from "../services/home-service";

class HomeController {
  public async get(req: Request, res: Response) {
    const getAll = await homeService.getUser();

    return res.json(getAll);
  }

  public async post(req: Request, res: Response) {
    const { name, budget, cost = 0 }: UserPostType = req.body;

    await homeService.postUser({
      name,
      budget,
      cost,
    });

    return res.status(200).json({ success: "Usuário cadastrado com sucesso!" });
  }

  public async postService(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name, cost, description } = req.body;

    await homeService.postServices(id, {
      name,
      cost,
      description,
    });

    return res.status(200).json({ success: "serviço cadastrado!" });
  }

  public async deleteService(req: Request, res: Response) {
    const id = Number(req.params.id);

    await homeService.deleteService(id);

    return res.status(200).json({ success: "Serviço deletado com sucesso!" });
  }

  public async getService(req: Request, res: Response) {
    const id = Number(req.params.id);
    const response = await homeService.getUserandService(id);

    return res.status(200).json(response);
  }

  public async deleteAllServices(req: Request, res: Response) {
    await homeService.deleteAllServices();

    return res.status(200).json({ success: "Todos os serviços deletados" });
  }

  public async updateService(req: Request, res: Response) {
    const service: Services = req.body;
    const id = Number(req.params.id);

    await homeService.patchService(id, service);

    return res
      .status(200)
      .json({ success: `Serviço de número ${id} atualizado` });
  }

  public async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const uniqueUser = await homeService.getUnique(id);

    return res.status(200).json(uniqueUser);
  }

  public async update(req: Request, res: Response) {
    const userUpdated: UserPostType = req.body;
    const serviceUpdated: Services = req.body;
    const id = Number(req.params.id);
    await homeService.updateUser(id, userUpdated, serviceUpdated);

    return res.status(200).json(userUpdated);
  }

  public async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await homeService.deleteUser(id);

    return res.status(200).json({ success: "Usuário deletado com sucesso!" });
  }
}

export const homeController = new HomeController();
