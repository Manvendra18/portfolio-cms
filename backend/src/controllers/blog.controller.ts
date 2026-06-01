import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPostBySlug = async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug as string;
      const post = await prisma.post.findUnique({ where: { slug } });
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, slug, content, tags, published, coverImage } = req.body;
    const post = await prisma.post.create({
      data: { title, slug, content, tags, published, coverImage },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const post = await prisma.post.update({
        where: { id },
        data: req.body,
      });
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  export const deletePost = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      await prisma.post.delete({ where: { id } });
      res.json({ message: "Post deleted" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  