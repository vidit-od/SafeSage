import { MainNavbar } from "../components/navbar"
import { Intro } from "../components/intro"
import { Trending } from "../components/trending"
import { BlogCatagories } from "../components/blogcatagories"
import { useEffect, useState } from "react"
import { LoadingComponent } from "../components/loading"
import axios from "axios"
import {  useRecoilState } from "recoil"
import { useratom } from "../store/atom/useratom"
export function Blog(){
    const userState = useRecoilState(useratom);
    const [loading , setLoading] = useState((userState[0].id == null)?true:false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if( !token || !token.startsWith('Bearer ')){
            userState[1]({
                id: null,
                name: null,
                email: null,
            })
            console.log(1);
            setLoading(false); 
        }
        else if (userState[0].id == null) {
            loaduser();
        }
    }, []);

    const loaduser = async()=>{
        const user = await axios.get('https://backend.vidit894.workers.dev/api/v1/user',{
            headers:{
                Authorization: localStorage.getItem('token')
            }
        })
        userState[1]({
            id: user.data.id,
            name: user.data.username,
            email: user.data.email,
        })
        setLoading(false);
    }
    if(loading){
        return <LoadingComponent/>
    }
    return(
        <div className=" relative">
            <MainNavbar/>
            <div className="flex relative w-full flex-wrap  flex-col md:flex-row px-5 md:px-10 lg:px-20">
                <Intro/>
                <Trending/>
            </div>
            <BlogCatagories/>
        </div>
    )
}