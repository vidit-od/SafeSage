import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { MainNavbar } from "../components/navbar";
import  {marked} from 'marked'
import { renderBlock } from "../components/blogWriteHelpers";
import { DocumentModle } from "../components/blogWriteTypes";
marked.setOptions({
    gfm:true
})

const API = import.meta.env.VITE_API_BASE_URL;

interface blog{
    title: string,
    content: string,
    tags: {
        tag: {
            id: string,
            name: string,
        }
    }[],
    date: string,
    author: {
        name: string
    }
}

export function Storyid(){
    const {id} = useParams();
    const [blog,setBlog] = useState<blog>();
    const [content , setcontent] = useState<DocumentModle>({blocks: [{
            type: "paragraph",
            children: [
              { text: "Error Loading the Blog !!", marks: { bold: true } },
            ]}
        ]});
    useEffect(()=>{
        loadblog();
    },[]);

    const loadblog= async()=>{
        try{
            const response = await axios.get<blog>(`${API}/api/v1/blog/get/${id}`,{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            });
            setBlog(response.data);
            const LoadedContent:DocumentModle = JSON.parse(response.data.content);
            setcontent(LoadedContent);
        }
        catch(e){
            console.log(e)
        }
    }
    if(blog == undefined) return (
        <div>loading...</div>
    )
    return(
        <div className=" absolute w-full h-full overflow-y-scroll snap-y snap-mandatory">
            <div className=" absolute w-full z-50">
                <MainNavbar/>
            </div>
            <TopContent title={blog.title}/>
            <BottomContent blog={blog} content={content}/>
        </div>
    )
}

const TopContent:React.FC<{title:string}> = ({title})=>{
    return (
        <div className="px-20 w-full h-40 z-0 flex justify-end flex-col">
            <div className=" w-full text-center font-space text-4xl font-bold pt-10 snap-start">
                {title}
            </div>
        </div>
    )
}

const BottomContent:React.FC<{blog:blog, content:DocumentModle}> = ({blog, content})=>{
    return(
        <div className="px-20 py-10 my-1 w-full snap-start">
            <div className="w-full border-b-2 "></div>
            <div className=""></div>
            <div className="flex font-space flex-wrap">
                <div className=" whitespace-pre-wrap w-full p-2  pl-10">
                    {content.blocks.map(renderBlock)}
                </div>
            </div>
            <div className="w-full border-b-2 my-3"></div>

            <div className=" w-1/3"> 
                    <div className="flex flex-col w-full ">
                    <div className="flex items-center ">
                            <div className=" w-2/5 text-center py-5">
                                Author 
                            </div>
                            <div className=" w-3/5 px-5 text-center flex left-0">{blog.author.name}</div>
                        </div>
                        <div className="flex items-center">
                            <div className=" w-2/5 text-center py-5">Published on </div>
                            <div className=" w-3/5 px-5 text-center flex left-0">{blog.date.split('T')[0]}</div>
                        </div>
                        {(blog.tags)?
                        <div className="flex items-stretch">
                            <div className=" w-2/5 text-center py-5">Tags</div>
                            <div className=" w-3/5 px-5 text-center">
                                {blog.tags.map(i => (
                                    <span key={i.tag.id} className="mx-1 flex left-0">
                                        {i.tag.name}
                                        <br></br>
                                    </span>
                                ))}
                            </div>
                        </div>:null}
                    </div>
                </div>
        </div>
    )
}

