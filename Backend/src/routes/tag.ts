import { Hono } from "hono";
import prisma from "../prisma";

export const TagRouter = new Hono();

// input array of stings ; all will be added to tags schema 
TagRouter.post('/add/bulk',async(c)=>{
    try{
        const tags:{
            tags:string[]
        } = await c.req.json();

        const all_tags = tags.tags
        const data_tag = all_tags.map((i)=>{
            return {
                name: i
            }
        })
        const response = await prisma.tags.createMany({
            data : data_tag
        })
        return c.json(response);
    }
    catch(e){
        return c.json({msg: "error",error:e});
    }
})

TagRouter.get('/get/bulk', async(c)=>{
    try{
        const response = await prisma.tags.findMany();
        return c.json(response);
    }
    catch(e){
        return c.json({msg: "something went wrong",error:e})
    }
})