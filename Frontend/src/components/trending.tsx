import img1 from '../assets/4.jpg'
import img2 from '../assets/3.jpg'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TrendingSkeleton } from '../skeleton/trendingskeleton';

interface Blogcontent{
    img: string,
    title: string,
    date: string,
    author: string,
    readtime: string,
    tags: string[],
}
   
export function Trending(){
    const [blogs ,setBlogs] = useState<Blogcontent[]>([]);
    const [loading , setLoading] = useState(true);
    useEffect(()=>{
        loadblogs();
    },[])
                
    const loadblogs = async()=>{
        const blog = await axios.post('https://backend.vidit894.workers.dev/api/v1/blog/bulk',{
            limit:2
        },{
            headers:{
                Authorization: localStorage.getItem('token')
            }
        })
        console.log(blog);
        setBlogs([...blogs, {
            img: img1 ,
            title:blog.data.posts[0].title,
            date:blog.data.posts[0].date,
            author:blog.data.posts[0].author.name,
            tags:["tag", "tagg", "tagged"],
            readtime:'5'
        }, {
            img: img2 ,
            title:blog.data.posts[1].title,
            date:blog.data.posts[1].date,
            author:blog.data.posts[1].author.name,
            tags:["tag", "tagg", "tagged"],
            readtime:'5'
        },])
        setLoading(false)
}
if(loading) return <TrendingSkeleton/>
return (
        <div className="md:w-2/5 py-9 font-space">
            <div className=" font-semibold">Trending on Safesage</div>
            <div className="bg-white flex flex-col justify-center">
                <BlogCard content={blogs[0]}></BlogCard>
                <BlogCard content={blogs[1]}></BlogCard>
            </div>
        </div>
    )
}

function BlogButton(){
    return(
        <div className="absolute bg-black p-2 md:p-4 rounded-full md:right-0 top-1/2 md:translate-x-1/2 -translate-y-2/3 md:left-auto left-0 -translate-x-1/2 transition-all duration-200 hover:bg-white group hover:border-2 hover:border-black">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className=" size-5 md:size-7 group-hover:fill-black group-hover:rotate-45 transition-all duration-200"><path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clipRule="evenodd" /></svg>
        </div>
    )
}

interface BlogCardComponent{
    content:Blogcontent
}
const BlogCard:React.FC<BlogCardComponent> = (content)=>{
    return (
        <div className="relative my-5">
            <div className="w-full flex md:flex-col">
                <div className="relative w-full md:h-44">
                    <img src={content.content.img} alt="" className="w-full md:h-44"/>
                    <BlogButton/>
                </div>
                <div className="flex flex-col justify-between">
                    <div className=" flex flex-col md:flex-row">
                        <div className="md:w-3/5 w-full font-bold md:text-xl line-clamp-2 object-cover">
                            {content.content.title} 
                        </div>
                        <div className="md:w-2/5 w-full flex md:flex-col text-right">
                            <div className="mr-2">{content.content.date.split('T')[0].split('-')[2]}</div>
                            <div className="">{Dates[parseInt(content.content.date.split('T')[0].split('-')[1])] + "-"+ content.content.date.split('T')[0].split('-')[0]}</div>
                        </div>
                    </div>
                    <div className="md:justify-start flex border-t-2 justify-between flex-wrap">
                        <div className="md:mr-5">{content.content.author}</div>
                        <div className="md:mr-5">{content.content.readtime}m read</div>
                        <div className="md:mr-5 line-clamp-1">{content.content.tags[0]}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
enum Dates {
    January = 1,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
  }