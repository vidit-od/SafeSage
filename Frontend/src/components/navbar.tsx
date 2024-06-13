import { useRecoilValue } from "recoil"
import { useratom } from "../store/atom/useratom"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"

export function MainNavbar(){
    const location = useLocation();
    
    return(
        <div className=" z-100 bg-white snap-start w-full py-2 px-5 md:px-10 lg:px-20 flex justify-between items-center">
            <Logo/>
            <NavLinks loc = {location.pathname}/>
        </div>
    )
}

export const Logo = ()=>{
    return (
        <div className="flex justify-center">
            <div className=" font-space text-3xl italics font-extrabold rotate-90">(:)</div>
            <div className=" ml-1 text-xl font-bold font-space flex items-center">
                Safesage.
            </div>
        </div>
    )
}

const NavLinks:React.FC<{loc: string}> = ({loc})=>{
    const USER = useRecoilValue(useratom);
    return(
        <>
            {(USER.id == null)?<GuestLinks/>:<LoggedLinks loc={loc}/>}        
        </>
    )
}

const GuestLinks = ()=>{
    const navigate = useNavigate();
    return(
        <>
            <div className="opacity-0 pointer-events-none absolute md:opacity-100 md:pointer-events-auto md:relative flex justify-between items-center">
                <button className="px-10 py-2 border-2 border-black border-solid rounded-full transition-all duration-500 flex justify-center items-center group relative" onClick={()=> navigate('/signup')}>
                    <div className="flex justify-center items-center translate-x-3 transition-all duration-300 group-hover:translate-x-0">
                        Signup
                        <div className=" translate-y-px opacity-0 -translate-x-3 group-hover:translate-x-3 transition-all group-hover:opacity-100 duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5"><path fillRule="evenodd" d="M15.28 9.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L13.69 10 9.97 6.28a.75.75 0 0 1 1.06-1.06l4.25 4.25ZM6.03 5.22l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L8.69 10 4.97 6.28a.75.75 0 0 1 1.06-1.06Z" clipRule="evenodd" /></svg>

                        </div>
                    </div>
                </button>
            </div>
        </>
    )
}

const LoggedLinks: React.FC<{loc:string}> = (loc)=>{
    const USER = useRecoilValue(useratom);
    const navigate = useNavigate();

    const home = useRef<HTMLButtonElement>(null);
    const stories = useRef<HTMLButtonElement>(null);
    const writing = useRef<HTMLButtonElement>(null);

    useEffect(()=>{
        if( !home || !home.current || !stories || !stories.current) return
        else if (loc.loc == '/blog') home.current.style.fontWeight = "700"; 
        else if(loc.loc == '/stories') stories.current.style.fontWeight= "700";
    },[loc])
    

    if( !USER || !USER.name) {
        return <GuestLinks/>
    }
    return(
    <div className="opacity-0 pointer-events-none absolute md:opacity-100 md:pointer-events-auto md:relative flex justify-between items-center">
        <button className="mx-4 transition-all duration-75 hover:border-b-2 border-black" ref={home} onClick={()=>navigate('/blog')}>Home</button>
        <button className="mx-4 transition-all duration-75 hover:border-b-2 border-black" ref={stories} onClick={()=>navigate('/stories')}>Our Stories</button>
        <button className="mx-4 transition-all duration-75 hover:border-b-2 border-black" ref={writing} onClick={()=>navigate('/blog/write')}>Start Writing</button>
        <button className="w-9 h-9 flex justify-center items-center border-2 border-black bg-black text-white border-solid rounded-full">{USER.name[0].toString().toUpperCase()}</button>
    </div>
    )
}