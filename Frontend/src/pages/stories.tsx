import { MainNavbar } from "../components/navbar"
import img1 from '../assets/3.jpg'
import img2 from '../assets/4.jpg'
import { Dates } from "../components/trending"
import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

interface cardcontent{
    id:string
    title: string,
    date: string,
    author: string,
    tags: string[],
}

export function Stories(){
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);
    const [blogs, setBlogs]= useState<bloginterface[]>([]);
    const [page, setPage] = useState(0);
    const [stopload, setStopLoad] = useState(false);
    const story = useRef<HTMLDivElement>(null);
    const loader = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        const handleMouseMove = (e:MouseEvent)=>{
            if(e.clientY < 50){
                setIsNavbarVisible(true);
            }
        }
        const handleScroll = ()=>{
            if(story.current && story.current.scrollTop === 0){
                setIsNavbarVisible(true);
            }
            else{
                setIsNavbarVisible(false);
            }
        }

        const storydiv = story.current
        window.addEventListener('mousemove',handleMouseMove)
        if(storydiv) storydiv.addEventListener('scroll',handleScroll);
        if(storydiv) storydiv.addEventListener('scroll',handleReload);
     
    },[]);
    
    const handleReload = async()=>{
        if( story.current && story.current.scrollHeight == story.current.scrollTop + story.current.clientHeight){
            setPage(prev => prev+10);
        }
    }
    
    useEffect(()=>{
        if(!stopload) loadblogs(page,10);

    },[page,stopload]);

    const loadblogs = async(skip:number , limit:number)=>{
        if(loader.current){
            loader.current.style.position = 'relative';
            loader.current.style.opacity = "100%";
        }
        try{
            const blog= await axios.get('https://backend.vidit894.workers.dev/api/v1/blog/bulk',{
                params:{
                    skip:skip,
                    limit:limit
                },
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
            const all_blog:bloginterface[] = blog.data.posts;
            if(all_blog == null){
                throw new Error('all blogs loaded')
            }
            all_blog.map(i =>{
                setBlogs(prevblogs => [...prevblogs,i])
            })
        }
        catch(e){
            setPage(blogs.length)
            setStopLoad(true);
        }
        if(loader.current){
            loader.current.style.position = 'absolute';
            loader.current.style.opacity = "0%";
        }
    }
    return (
        <div className="absolute w-full h-full bg-[#f5f5f5]" >
            <div className="flex flex-wrap overflow-y-scroll h-full" ref={story}>
                <div className={` absolute z-50 w-full transition-all duration-200 ${(isNavbarVisible)? 'translate-y-0' : '-translate-y-full'} `}>
                    <MainNavbar/>
                </div>
                <IntroCard/>
                <BigCard id="" title="The Making of Safesage." date="28-12-2001" author="vidit" tags={[]} />
                <div className="flex flex-wrap justify-center mx-20 mt-10 w-full items-center">
                    {blogs.map((item)=>{
                        return(
                            <div key={item.id}>
                                <SmallCard id={item.id} title={item.title} date={item.date.split('T')[0]} author={item.author.name} tags={[]} />
                            </div>
                        )
                    })}

                </div>
                <div className=" overflow-hidden p-10 w-full flex justify-center opacity-0 absolute" ref={loader}>
                        <div className="absolute border-gray-400 border-8 border-solid p-2 rounded-full border-l-green-500 animate-rotate" ></div>
                </div>

                {(stopload)?<div className=" w-full flex font-space justify-center text-center text-white bg-black py-10 text-2xl">
                    🛑 This is not a Platform to DoomScroll  <br />
                    All blogs are loaded.<br />
                    Try clicking on them and read the contents as well.<br />
                </div>:<></>}
            </div>
        </div>
    )
}

const IntroCard = ()=>{
    return(
        <div className="h-1/3 w-full flex justify-end items-end px-10 py-7 flex-col">
            <div className="font-space w-full text-center text-5xl font-bold flex items-center justify-center">
                Welcome to Safesage.
            </div>
            <div className="w-full text-center font-space"> The Latest industry news, interviews, technologies, and resources</div>
        </div>
    )
}
const BigCard:React.FC<cardcontent> = ({title,date,author,tags})=>{
    return(
        <div className="h-2/3 w-full relative overflow-hidden mx-20 -translate-y-2 rounded-sm font-space cursor-pointer z-10">
            <div className="w-full h-full -z-10 ">
                <img src={img1} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute w-full h-full bg-black opacity-40 left-0 top-0 z-0"></div>
            <div className=" absolute w-full h-full z-10 text-white top-0 left-0 p-5 flex justify-end  flex-col">
                <div className="flex">
                    <div className="flex items-center mr-5"> 
                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6"><path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" /></svg>

                        </div>
                        <div className="">
                            {author}
                        </div>
                    </div>
                    <div className="flex items-center"> 
                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6"><path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" /></svg>
                        </div>
                        <div className="">
                            {date.split('-')[0] + ' ' + Dates[parseInt(date.split('-')[1])] + ' ' + date.split('-')[2]}
                        </div>
                    </div>
                </div>
                <div className="text-4xl">
                    {title}
                </div>
                <div className="flex mt-4">
                    {tags.map((tag,index)=>{
                        if(index>2) return
                        return(
                            <div className="mr-2 border-2 border-white border-solid rounded-full px-2" key={index}> 
                                {tag}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export const SmallCard:React.FC<cardcontent> = ({id,title,date,author,tags})=>{
    const navigate = useNavigate();
    return(
        <div className="w-50vw m-2 max-w-68 pt-2 font-space shadow-bdr-light p-5 rounded-lg transition-all cursor-pointer duration-400 hover:bg-white group" onClick={()=> navigate(`/stories/${id}`)}>
            <div className="pt-5 flex">
                <div className="">{author}</div>
                <div className="ml-10">{date.split('-')[2] + ' ' + Dates[parseInt(date.split('-')[1])] + ' ' + date.split('-')[0]}</div>
            </div>
            <div className="flex justify-between">
                <div className=" font-bold text-2xl line-clamp-2 h-20">{title}</div>
                <div className="group-hover:bg-black group-hover:transition-all group-hover:duration-300 h-fit rounded-full group-hover:scale-150 group">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 group-hover:rotate-45 transition-all group-hover:fill-white duration-150"><path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clipRule="evenodd" /></svg>
                </div>
            </div>
            <div className="flex">
            {tags.map((tag, index)=>{
                if(index > 1) return
                return(
                    <div className=" w-min rounded-full px-2 text-gray-500 border-2 border-solid border-gray-500 mr-2 line-clamp-1" key={index}>
                        {tag}
                    </div>
                )
            })}
            </div>
        </div>
    )
}


export interface bloginterface{
    id: string,
    title: string,
    content: string,
    date: string,
    author: {
        id: string,
        name: string,
        email: string
    }
}