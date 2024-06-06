import { Hono } from "hono";
import { UserRouter } from "./user";
import { BlogRouter } from "./blog";

export const IndexRouter = new Hono();

IndexRouter.route('/user', UserRouter);
IndexRouter.route('/blog',BlogRouter);
