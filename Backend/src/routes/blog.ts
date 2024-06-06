import { Hono } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import prisma from "../prisma";
import { createPost, updatePost } from "@vidit-od/common-app";

export const BlogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_secret  : string
    },
    Variables:{
        userId: string
    }
}>();

BlogRouter.use(async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_secret);
	if( typeof(payload.id) != 'string') return c.json({msg: 'error'});
	const id:string = payload.id;
	if (!payload ) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', id);
	await next()
})

BlogRouter.post('/',async(c)=>{
	try	{
		const authorId = c.get('userId');
		const body = await c.req.json();
		const {success} = createPost.safeParse(body);
		if(!success) return c.json({msg: 'invalid body'},400);
		const post = await prisma.post.create({
			data:{
				title: body.title,
				content : body.content,
				authorID: authorId
			}
		})

		return c.json({msg:"Post created", post},200);
	}
	catch(e){
		return c.json({msg: 'Something went wrong',error:e},400);
	}

})

BlogRouter.put('/',async(c)=>{
	try{
		const authorId = c.get('userId');
		const body = await c.req.json();
		const {success} = updatePost.safeParse(body);
		if(!success) return c.json({msg: "Invalid body"},400);

		const response = await prisma.post.update({
			where:{
				id: body.id,
				authorID: authorId
			},
			data:{
				title: body.title,
				content: body.content
			}
		});

		return c.json({msg:'updated', response},200);
	}
	catch(e){
		return c.json({msg: "something went wrong",error:e},404);
	}
})

BlogRouter.get('/:id',async(c)=>{
	const postid = c.req.param('id');
	const userId = c.get('userId');
	return c.json(await prisma.post.findUnique({
		where:{
			id: postid,
			authorID: userId,
		}
	}))
})

BlogRouter.get('/bulk',async(c)=>{

})
