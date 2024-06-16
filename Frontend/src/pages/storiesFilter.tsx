import { useLocation, useNavigate } from "react-router-dom";
import { MainNavbar } from "../components/navbar";
import { useEffect, useState } from "react";
import { SmallCard, bloginterface } from "./stories";
import axios from "axios";

export function StoriesFilter(){
    const location = useLocation();
    const navigate = useNavigate();
    const [blogs, setBlog] = useState<bloginterface[]>([]);
    const [loading, setloading] = useState(true);
    useEffect(()=>{
        if(location.search.indexOf('?filter=') != -1 && location.search.indexOf('&tag=') != -1){
            console.log(1);
            const filter=(location.search.split('&')[0].slice(8));
            const tag =(location.search.split('&')[1].slice(4));
            loadblog(filter,tag);
        }
        else{
            navigate('/stories')
        }
    },[])
    const loadblog = async(filter:string,tag:string)=>{
        tag = tag.replace(/%20/g, ' ')
        const response = await axios.get('https://backend.vidit894.workers.dev/api/v1/blog/filter',{
            headers:{
                Authorization: localStorage.getItem('token')
            },
            params:{
                filter:filter,
                tag: tag
            }
        })
        const post:bloginterface[] = response.data.posts;
        console.log(post);
        setBlog(post);
        setloading(false);
    }
    if( loading) return <div> loading ...</div>
    return(
        <div>
            <MainNavbar/>
            <div className="w-full overflow-hidden">
            <div className="flex flex-wrap justify-center mt-10 w-full snap-start items-center">
                {blogs.map((item)=>{
                    return(
                        <div key={item.id}>
                            <SmallCard id={item.id} title={item.title} date={item.date.split('T')[0]} author={item.author.name} tags={[]} />
                        </div>
                    )
                })}
            </div>
            </div>
        </div>
    )
}