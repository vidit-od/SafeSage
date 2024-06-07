import axios from "axios";
import { useState } from "react";
import { createPost } from '@vidit-od/common-app'
import { useNavigate } from "react-router-dom";
export function BlogWrite(){
    const textrows = 16;
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const navigate = useNavigate();
    const publishblog = async()=>{
        try{
            const token = localStorage.getItem('token');
            const {success} = createPost.safeParse({
                title,
                content
            })
            if(!success) return new Error

            const response = await axios.post('https://backend.vidit894.workers.dev/api/v1/blog',{
                title,
                content,
            },{
                headers:{
                    Authorization: token,
                }
            }); 
            if(response.data == null) throw new Error();
            navigate('/blog');
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <div>
            <div className="w-full">
            <div className=" bg-gray-100 p-2 md:p-5 flex justify-between items-center shadow-md">
                    <div className="flex justify-center md:ml-20">
                        <div className=" font-space md:text-3xl italics font-extrabold rotate-90">(:)</div>
                        <div className="text-black ml-1 text-xl font-bold font-space flex items-center">
                            SafeSage
                        </div>
                    </div>
                    <div className="flex justify-between items-center md:mr-10">
                        <button className="bg-green-500 px-2 md:px-7 md:py-1 rounded-full text-white mx-2" onClick={publishblog}>Publish</button>
                        <button className="w-5 h-5 md:w-7 md:h-7 rounded-full flex justify-center items-center mx-2 text-white">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 stroke-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                        </svg>

                        </button>

                        <div className="w-5 h-5  text-sm md:text-xl md:w-7 md:h-7 bg-gray-500 rounded-full flex justify-center items-center mx-2 text-white">V</div>
                    </div>
                </div>
            </div>
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