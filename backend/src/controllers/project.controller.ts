import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, techStack, liveUrl, githubUrl, imageUrl, featured, order } = req.body;
    const project = await prisma.project.create({
      data: { title, description, techStack, liveUrl, githubUrl, imageUrl, featured, order },
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const updateProject = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const project = await prisma.project.update({
        where: { id },
        data: req.body,
      });
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  export const deleteProject = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      await prisma.project.delete({ where: { id } });
      res.json({ message: "Project deleted" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };