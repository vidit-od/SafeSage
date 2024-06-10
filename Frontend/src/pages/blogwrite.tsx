import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { createPost } from '@vidit-od/common-app'
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useratom } from "../store/atom/useratom";
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
    const navigate = useNavigate();
    const user = useRecoilValue(useratom);
    const publishbutton = useRef<HTMLButtonElement>(null);

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
        try{
            const token = localStorage.getItem('token');
            const {success} = createPost.safeParse({
                title,
                content
            })
            if(!success) return new Error('Zod error')

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
            navigate('/blog');
        }
        catch(e){
            console.log(e);
        }
    }
    

    return(
        <div className="w-full">
        <div className=" bg-gray-100 p-2 md:p-5 flex justify-between items-center shadow-md">
                <BlogWriteLogo/>
                <div className="flex justify-between items-center md:mr-10">
                    <button className="bg-green-500 px-2 md:px-7 md:py-1 rounded-full text-white mx-2 disabled:opacity-50 disabled:cursor-not-allowed" onClick={publishblog} ref={publishbutton}>Publish</button>
                    <div className="w-5 h-5  text-sm md:text-base md:w-9 md:h-9 bg-black rounded-full flex justify-center items-center mx-2 text-white">{user.name[0].toUpperCase()}</div>
                </div>
        </div>
        </div>
    )
}


const BlogWriteLogo = ()=>{
    const navigate = useNavigate();
    return (
        <div className="flex justify-center md:ml-20 cursor-pointer" onClick={()=> navigate('/blog')}>
            <div className=" font-space md:text-3xl italics font-extrabold rotate-90">(:)</div>
            <div className="text-black ml-1 text-xl font-bold font-space flex items-center">
                SafeSage
            </div>
        </div>
    )
}