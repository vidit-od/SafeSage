import { Hono } from "hono";
import prisma from "../prisma";
import { sign,decode,verify } from "hono/jwt"; 
import {signinInput, signupInput} from "@vidit-od/common-app" 

export const UserRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_secret  : string
    }
}>();

// api/v1/user/signup route: To create new Users
UserRouter.post('/signup',async(c)=>{
    try{
        // input verification using zod 
        const body = await c.req.json()
        const {success} = signupInput.safeParse(body);
        if( !success) return c.json({msg: "Invalid Body in request"},400)
        
        // prisma query to check if Email already exists (Not necessary coz taken care in postgres)
        const user = await prisma.user.findFirst({
            where:{
                email: body.email
            }
        })
        if( user != null) {        
            return c.json({msg: "Email already exists"},404)
        }

        // prisma query to create a user
        const response = await prisma.user.create({
            data:{
                email   : body.email,
                name    : body.name,
                password: body.password
            }
        })

        // return jwt token for auth
        const token = 'Bearer ' + await sign({id : response.id}, c.env.JWT_secret);
        return c.json({token},200);
    }
    catch(e){
        return c.json({msg: "Something Went Wrong",error: e},400)
    }
})

// api/v1/user/signin route: To login users
UserRouter.post('/signin',async(c)=>{
    try{
        // input verification using zod
        const body= await c.req.json(); 
        const {success} = signinInput.safeParse(body);
        if( !success) return c.json({msg: "Invalid Body in request"},400)
            
        // prisma query to find user
        const response = await prisma.user.findUnique({
            where:{
                email: body.email,
                password: body.password
            }
        })
        if(response == null) throw new Error();
        // Return Jwt token
        const token = 'Bearer '+ await sign({id: response?.id}, c.env.JWT_secret);
        return c.json({token})
    }
    catch(e){
        return c.json({msg: "Something Went Wrong",error: e},400)
    }
})
