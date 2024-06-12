import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { createPost } from '@vidit-od/common-app'
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useratom } from "../store/atom/useratom";
import { Logo } from "../components/navbar";
export function BlogWrite(){
    const textrows = 16;
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');


    return(
        <div>
            <BlogWriteNavbar title={title} content = {content} state={(title.length < 5 || content.length < 5)? false : true } />
            <div className="w-full flex items-center px-20 py-5 pb-0">
                <div className="absolute -translate-x-full py-2">Title</div>
                <input type="text " name="" id="" placeholder="Title" className=" outline-none w-screen translate-x-5 p-2 rounded-md text-3xl font-bold" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="w-full flex px-20 py-5 pb-0">
                <div className="absolute -translate-x-full py-2">Content</div>
                <textarea name="" id="" rows={textrows} value={content} onChange={(e)=>setContent(e.target.value)} className=" outline-none w-screen translate-x-5 p-2 h-fit border-2 border-gray-300 border-solid rounded-md" placeholder="Tell your story..."/>
            </div>
        </div>
    )
}

interface Blog{
    title: string,
    content: string,
    state: boolean,
}
const BlogWriteNavbar: React.FC<Blog> = ({title, content , state})=>{
    
    return(
        <div className="snap-start w-full py-2 px-5 md:px-10 lg:px-20 flex justify-between items-center">
            <Logo/>
            <NavLinks title ={title} content={content} state={state}/>
        </div>
    )
}

const NavLinks:React.FC<Blog> = ({title,content,state})=>{
    const user = useRecoilValue(useratom);
    const navigate = useNavigate();

    const home = useRef<HTMLButtonElement>(null);
    const stories = useRef<HTMLButtonElement>(null);
    const publishbutton = useRef<HTMLButtonElement>(null);
    const loader = useRef<HTMLDivElement>(null);
    const name = useRef<HTMLDivElement>(null);
    if( !user || !user.name ) return ( <></>)

    useEffect(()=>{
        if( !state ){
            if( publishbutton.current) publishbutton.current.disabled = true;
        }
        else{
            if( publishbutton.current) publishbutton.current.disabled = false;
        }
    },[state]);

    const publishblog = async()=>{
        if(loader.current && name.current) {
            loader.current.style.opacity = "1";
            name.current.style.transform = "translateX(0px)"
        }
        try{
            const token = localStorage.getItem('token');
            const {success} = createPost.safeParse({
                title,
                content
            })
            if(!success) throw new Error('Zod error')

            const response = await axios.post('https://backend.vidit894.workers.dev/api/v1/blog',{
                title,
                content,
            },{
                headers:{
                    Authorization: token,
                }
            }); 
            console.log(response);
            if(response.data == null) throw new Error();
            if(loader.current){
                loader.current.style.border = "none";
                loader.current.style.animation = "none";
                loader.current.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 fill-green-500">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                </svg>`
                await new Promise(r=>setTimeout(r,1000));
            }
            navigate('/blog');
        }
        catch(e){
            if(loader.current) {
                loader.current.style.border = 'none'
                loader.current.style.animation = "none"
                loader.current.innerHTML = 
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="size-5 fill-red">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                </svg>`
                setTimeout(()=>{
                    if(loader.current == null) return 
                    loader.current.style.opacity = "0"
                    loader.current.style.border = '4px solid rgb(107 114 128)'
                    loader.current.style.borderLeft = '4px solid rgb(34 197 94)'
                    loader.current.style.animation = "circle 1s linear infinite"
                    loader.current.innerHTML = ``
                },5000)
            }
        }
    }

    return(
        <div className="opacity-0 pointer-events-none absolute md:opacity-100 md:pointer-events-auto md:relative flex justify-between items-center">
        <button className="mx-4 transition-all duration-75 hover:border-b-2 border-black" ref={home} onClick={()=>navigate('/blog')}>Home</button>
        <button className="mx-4 transition-all duration-75 hover:border-b-2 border-black" ref={stories} onClick={()=>navigate('/stories')}>Our Stories</button>
        <button className="mx-4 transition-all duration-200 bg-black px-2 md:px-2 md:py-1 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center" ref={publishbutton} onClick={()=>publishblog()}>
            <div className="transition-all duration-100 translate-x-5" ref={name}>
                Publish
            </div>
            <div className="w-5 h-5 rounded-full ml-4 border-4 border-gray-500 border-l-green-500 animate-rotate right-12 pointer-events-none opacity-0" ref={loader}></div>
        </button>
        <button className="w-9 h-9 flex justify-center items-center border-2 border-black bg-black text-white border-solid rounded-full">{user.name[0].toString().toUpperCase()}</button>
    </div>
    )
}