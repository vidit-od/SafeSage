import { Hono } from "hono";
import { UserRouter } from "./user";
import { BlogRouter } from "./blog";
import { TagRouter } from "./tag";

export const IndexRouter = new Hono();

IndexRouter.route('/user', UserRouter);
IndexRouter.route('/blog',BlogRouter);
IndexRouter.route('/tags',TagRouter);
