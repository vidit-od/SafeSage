import { Hono } from "hono";
import prisma from "../prisma";
import { sign,decode,verify } from "hono/jwt"; 
import {signinInput, signupInput} from "@vidit-od/common-app" 
import { use } from "hono/jsx";

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

// api/v1/user route: For user authentication and jwt login
UserRouter.get('/',async(c)=>{
    try{
        const auth = c.req.header('Authorization');
        if(auth == undefined) throw new Error()
        const token = auth.split(' ')[1];
        
        const payload = await verify(token,c.env.JWT_secret);
        if(typeof payload.id != 'string') throw new Error();
        const userid = payload.id;

        const user = await prisma.user.findUnique({
            where:{
                id: userid
            }
        })
        if(user == null) throw new Error();
        return c.json({id: user.id, email: user.email, username: user.name});
    }
    catch(e){
        return c.json({msg: 'un-authorized',error:e});
    }
})
