import { PrismaClient } from "@prisma/client";

export interface UserPostType {
  name: string;
  budget: number;
  cost?: number;
  services?: Services;
}

export interface Services {
  name?: string;
  cost?: number;
  description?: string;
}

const prisma = new PrismaClient();
class HomeService {
  public async getUser() {
    const getAll = await prisma.user.findMany({
      include: {
        services: true,
      },
    });

    return getAll;
  }

  public async getUnique(id: number) {
    const getUnique = await prisma.user.findUnique({
      where: {
        id,
      },

      include: {
        services: true,
      },
    });

    return getUnique;
  }

  public async postUser(req: UserPostType) {
    const postUser = await prisma.user.create({
      data: {
        name: req.name,
        budget: req.budget,
        cost: req.cost,
      },
    });

    return postUser;
  }

  public async postServices(userId: number, req: Services) {
    const postServices = await prisma.services.create({
      data: {
        name: req.name,
        cost: req.cost,
        description: req.description,

        user: {
          connect: { id: userId },
        },
      },
    });

    return postServices;
  }

  public async patchService(id: number, req: Services) {
    const patchService = await prisma.services.update({
      where: {
        id,
      },
      data: {
        name: req.name,
        cost: req.cost,
        description: req.description,
      },
    });

    return patchService;
  }

  public async deleteService(id: number) {
    const deleteService = await prisma.services.delete({
      where: {
        id,
      },
    });

    return deleteService;
  }

  public async deleteAllServices() {
    const deleteAllServices = await prisma.services.deleteMany();

    return deleteAllServices;
  }

  public async updateUser(id: number, req: UserPostType, reqService: Services) {
    const updateUser = await prisma.user.update({
      where: {
        id,
      },

      data: {
        name: req.name,
        budget: req.budget,
        cost: req.cost,
      },
    });

    return updateUser;
  }

  public async deleteUser(id: number) {
    const deleteUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    return deleteUser;
  }
}

export const homeService = new HomeService();
