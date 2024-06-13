import { MainNavbar } from "../components/navbar"
import img1 from '../assets/3.jpg'
import { Dates } from "../components/trending"
import React, { useEffect, useRef, useState } from "react"
export function Stories(){
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);
    const story = useRef<HTMLDivElement>(null);
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

        return ()=>{
            window.removeEventListener('mousemove',handleMouseMove)
            if(storydiv) storydiv.removeEventListener('scroll',handleScroll)
    
        };
    },[]);
    return (
        <div className="absolute w-full h-full" >
            <div className="flex flex-wrap overflow-y-scroll h-full snap-y snap-mandatory" ref={story}>
                <div className={` absolute z-50 w-full transition-all duration-200 ${(isNavbarVisible)? 'translate-y-0' : '-translate-y-full'} `}>
                    <MainNavbar/>
                </div>
                <IntroCard/>
                <BigCard title="Welcome to Safesage." date="28-12-2001" author="vidit" tags={['sdvsdvsd','sdsdfsds','sdfsdf','sfsdfdasf','afdafaffas']} />
                <div className="flex flex-wrap mx-20 w-full snap-start">
                    <SmallCard/>
                    <SmallCard/>
                    <SmallCard/>
                    <SmallCard/>
                    <SmallCard/>
                    <SmallCard/>
                    
                </div>
            </div>
        </div>
    )
}

const IntroCard = ()=>{
    return(
        <div className="h-1/3 w-full snap-start flex justify-end items-end px-10 py-7 flex-col">
            <div className="font-space w-full text-center text-5xl font-bold flex items-center justify-center">
                Welcome to Safesage.
            </div>
            <div className="w-full text-center font-space"> The Latest industry news, interviews, technologies, and resources</div>
        </div>
    )
}

interface cardcontent{
    title: string,
    date: string,
    author: string,
    tags: string[],
}
const BigCard:React.FC<cardcontent> = ({title,date,author,tags})=>{
    return(
        <div className="h-2/3 w-full relative snap-start overflow-hidden mx-20 -translate-y-2 rounded-sm font-space cursor-pointer z-10" onClick={()=>console.log('ho')}>
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

const SmallCard = ()=>{
    return(
        <div className="bg-gray-400 w-1/2 h-50vh snap-start">
            hell
        </div>
    )
}
