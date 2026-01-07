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
        userId: string,
		isGuest: boolean,
    }
}>();

// middleware to verify Jwt token in header and set userid parameter for future queries 
BlogRouter.use(async (c, next) => {
	const jwt = c.req.header('Authorization');
	if(jwt){
		try{
			const token = jwt.split(' ')[1];
			const payload = await verify(token,c.env.JWT_secret);
			if(!payload || typeof(payload.id) != 'string') return c.json({msg:"invalid token"},400);

			c.set('userId', payload.id);
			c.set('isGuest', false);
		}
		catch{
			return c.json({error: 'unauthorised'},401);
		}
	}
	else{
		c.set('isGuest', true);
	}
	await next();
})

// api/v1/blog route		: To create new Posts 
BlogRouter.post('/',async(c)=>{
	try	{
		// get data , input verification using zod
		const isGuest = c.get('isGuest');
		if(isGuest) return c.json({msg: "Access denied"},401);
		const authorId = c.get('userId');
		const body = await c.req.json();

		const serializedPost = JSON.stringify(body.doc);
		const check = {
			title : body.title,
			content : serializedPost
		}
		const {success} = createPost.safeParse(check);
		console.log(success);
		if(!success) return c.json({msg: 'invalid body'},400);
		
		// prisma query to create a post 
		const post = await prisma.post.create({
			data:{
				title: body.title,
				content : serializedPost,
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
		const isGuest = c.get('isGuest');
		if(isGuest) return c.json({msg: "Access denied"},401);
		
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

BlogRouter.get('/bulk',async(c)=>{

    const skipstr = c.req.queries('skip')
    const limitstr = c.req.queries('limit')
	if(skipstr != undefined && limitstr!= undefined){
		const skip = parseInt(skipstr[0])
		const limit = parseInt(limitstr[0])

		const total_posts = await prisma.post.count();
		if(skip > total_posts) return c.json({posts: null})
		const posts = await prisma.post.findMany({
			skip: skip,
			take: limit,
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
})

BlogRouter.get('get/:id',async(c)=>{
	const postid = c.req.param('id');
	const unique = await prisma.post.findUnique({
		where:{
			id: postid
		},
		select:{
			title:true,
			content:true,
			tags: {
				select:{
					tag: {
						select:{
							id:true,
							name: true,
						}
					}
				}
			},
			date:true,
			author:{
				select:{
					name:true,
				}
			}
		}
	})

	if( !unique)return c.json({msg: 'Invalid Postid'},400);
	return c.json(unique)
})
BlogRouter.post('/create/bulk',async(c)=>{
	const isGuest = c.get('isGuest');
	try{
		if(!isGuest) return c.json({msg: "Access denied"}, 401);
		const blogs:{
			title:string,
			content:string
		}[] = await c.req.json();
		const query = blogs.map(i=>{
			return {
				title: i.title,
				content: i.content,
				authorID: c.get('userId'),
			}
		})
		const response = await prisma.post.createMany({
			data:query
		})
		return c.json(response);
	}
	catch{
		return c.json({msg: "Error"}, 401);
	}
})

BlogRouter.get('/filter', async(c)=>{
	let filter_arr =c.req.queries('filter');
	if(filter_arr == undefined) {
		filter_arr = ['']
	};
	let filter = filter_arr[0];
	
	let tag_arr =c.req.queries('tag');
	if(tag_arr == undefined) {
		tag_arr = ['']
	};
	let tag = tag_arr[0];
	if(tag!=''){
		const posts = await prisma.post.findMany({
			where:{
				title:{
					contains:filter,
					mode: 'insensitive',
				},
				tags:{
					some:{
						tag:{
							name:{
								contains: tag,
								mode: 'insensitive',
							}
						}
					}
				}
			},
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
	const posts = await prisma.post.findMany({
		where:{
			title:{
				contains:filter,
				mode:'insensitive',
			}
		},
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

})