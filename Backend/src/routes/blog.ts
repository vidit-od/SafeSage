import { Hono } from "hono";
import { verify } from "hono/jwt";
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

// middleware to verify Jwt token in header and set userid parameter for future queries 
BlogRouter.use(async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_secret);
	if( typeof(payload.id) != 'string') return c.json({msg: 'error'},400);
	const id:string = payload.id;
	if (!payload ) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', id);
	await next()
})

// api/v1/blog route		: To create new Posts 
BlogRouter.post('/',async(c)=>{
	try	{
		// get data , input verification using zod
		const authorId = c.get('userId');
		const body = await c.req.json();
		const {success} = createPost.safeParse(body);
		if(!success) return c.json({msg: 'invalid body'},400);
		
		// prisma query to create a post 
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

// api/v1/blog route		: To update existing users 
BlogRouter.put('/',async(c)=>{
	try{
		// get data , input verification using zod 
		const authorId = c.get('userId');
		const body = await c.req.json();
		const {success} = updatePost.safeParse(body);
		if(!success) return c.json({msg: "Invalid body"},400);
		
		// prisma query to update post
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

// api/v1/blog/id route		: To get specific post
// api/v1/blog/bulk route	: To get all posts
BlogRouter.post('/:id',async(c)=>{
	const postid = c.req.param('id');
	if( postid == 'Bulk' || postid == 'bulk'){
		const response = await c.req.json()
		console.log(response);
		if( !response || !response.limit) {
			const posts = await prisma.post.findMany({
				select:{
					id : true,
					title: true,
					content: true,
					date: true,
					author:{
						select:{
							id: true,
							name: true,
							email: true
						}
					}
				}
			})
			return c.json({posts});
		}
		const posts = await prisma.post.findMany({
			skip: 2,
			take: response.limit,
			select:{
				id : true,
				title: true,
				content: true,
				date:true,
				author:{
					select:{
						id: true,
						name: true,
						email: true
					}
				}
			}
		})
		return c.json({posts});
	}
	const userId = c.get('userId');
	const unique = await prisma.post.findUnique({
		where:{
			id: postid,
			authorID: userId,
		}
	})

	if( !unique)return c.json({msg: 'Invalid Postid'},400);
	return c.json(unique)
})

