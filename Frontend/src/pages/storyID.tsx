import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import img from '../assets/5.jpg'
import { MainNavbar } from "../components/navbar";
import  {marked} from 'marked'
marked.setOptions({
    gfm:true
})
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
    const [content , setcontent] = useState<string>("");
    useEffect(()=>{
        loadblog();
    },[]);

    const preprocess = async(data:string)=>{
        const BRadd = data.replace(/\\n/g, ' \n ')
        const heddings = await marked(BRadd);
        const h3change = heddings.replace(/<h3>/g, '<div class= "text-lg font-semibold py-5 snap-start -translate-x-4">')
        const h3change2 = h3change.replace(/<\/h3>/g, '</div>')
        const h2change = h3change2.replace(/<h2>/g, '<div class= "underline text-xl font-bold py-5 snap-start -translate-x-4">')
        const h2change2 = h2change.replace(/<\/h2>/g, '</div>')
        return h2change2;
    }

    const loadblog= async()=>{
        try{
            const response = await axios.get<blog>(`https://backend.vidit894.workers.dev/api/v1/blog/get/${id}`,{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            });
            setBlog(response.data);
            const parsed= response.data.content;
            const temp = await preprocess(parsed)
            setcontent(temp);
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
        <div className="px-20 w-full h-full absolute z-0 flex justify-end flex-col snap-start">
            <div className=" w-full text-center font-space text-4xl font-bold pb-10 snap-start">
                {title}
            </div>
            <div className="w-full h-1/3 overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover"/>
            </div>
        </div>
    )
}

const BottomContent:React.FC<{blog:blog, content:string}> = ({blog, content})=>{
    return(
        <div className=" absolute translate-y-screen px-20 my-1 w-full snap-start">
            <div className="w-full border-b-2 "></div>
            <div className=""></div>
            <div className="flex font-space flex-wrap">
                <div className=" w-1/3"> 
                    <div className="flex flex-col w-full border-2 border-t-0">
                    <div className="flex items-center">
                            <div className=" w-2/5 text-center border-r-2 py-5">
                                Author 
                            </div>
                            <div className=" w-3/5 px-5 text-center">{blog.author.name}</div>
                        </div>
                        <div className="flex items-center">
                            <div className=" w-2/5 text-center border-r-2 py-5">Published on </div>
                            <div className=" w-3/5 px-5 text-center">{blog.date.split('T')[0]}</div>
                        </div>
                        {(blog.tags)?
                        <div className="flex items-stretch">
                            <div className=" w-2/5 text-center border-r-2 py-5">Tags</div>
                            <div className=" w-3/5 px-5 text-center">
                                <ul className=" list-disc">
                                    {blog.tags.map(i => {
                                        return <li key={i.tag.id}>{i.tag.name}</li>
                                    })}
                                </ul>
                            </div>
                        </div>:null}
                    </div>
                </div>
                <div className=" w-2/3 p-2  pl-10" dangerouslySetInnerHTML={{__html: content}}></div>
            </div>
        </div>
    )
}

