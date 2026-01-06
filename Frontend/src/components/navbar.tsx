import { useRecoilValue } from "recoil"
import { useratom } from "../store/atom/useratom"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

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
            <LoggedLinks loc={loc}/>        
        </>
    )
}

export const GuestLinks = ()=>{
    const navigate = useNavigate();
    return(
        <>
            <div className="opacity-0 pointer-events-none absolute md:opacity-100 md:pointer-events-auto md:relative flex justify-between items-center">
                <button className="px-8 py-1 border-2 border-black border-solid rounded-full transition-all duration-500 flex justify-center items-center group relative" onClick={()=> navigate('/signup')}>
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
    const [userPanel, setuserPanel] = useState<boolean>(false);
    const navigate = useNavigate();
    
    const home = useRef<HTMLButtonElement>(null);
    const stories = useRef<HTMLButtonElement>(null);
    const writing = useRef<HTMLButtonElement>(null);

    useEffect(()=>{
        if( !home || !home.current || !stories || !stories.current) return
        else if (loc.loc == '/blog') home.current.style.fontWeight = "700"; 
        else if(loc.loc == '/stories') stories.current.style.fontWeight= "700";
    },[loc])
    
    return(
    <>
        <div className="opacity-0 pointer-events-none absolute md:opacity-100 md:pointer-events-auto md:relative flex justify-between items-center">
            <button className="mx-4 transition-all duration-75 hover:border-b-2 border-black" ref={home} onClick={()=>navigate('/blog')}>Home</button>
            <button className="mx-4 transition-all duration-75 hover:border-b-2 border-black" ref={stories} onClick={()=>navigate('/stories')}>Our Stories</button>
            <button className="mx-4 transition-all duration-75 hover:border-b-2 border-black" ref={writing} onClick={()=>navigate('/blog/write')}>Start Writing</button>
            { !USER.name && <GuestLinks/>}
            {USER && USER.name &&
            <div>
            <button
              className="w-9 h-9 flex justify-center items-center 
                         border-2 border-none bg-black text-white 
                         rounded-full 
                         hover:ring-4 hover:ring-gray-400"
                onClick={() => setuserPanel(!userPanel)}
            >
              {USER.name[0].toString().toUpperCase()}
            </button>
            <LogOut userPanel={userPanel}/>
            </div>}
        </div>
    </>
    )
}
const LogOut = ({userPanel}: {userPanel:boolean}) =>{
    const navigate = useNavigate();

    const LogoutLogic = ()=>{
        localStorage.removeItem('token');
        navigate('/signup');
    }
    return(
    <>
        <div
        className={`absolute right-0 mt-3 w-36 rounded-sm shadow-bdr-light bg-white transition-all duration-200 z-10
        ${userPanel ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}>
        
        {/* Triangle pointer */}
        <div className="absolute right-2 -translate-y-3">
<svg
  viewBox="0 0 24 24"
  aria-hidden="true"
  className="w-5 h-5"
>
  <path
    d="M22 17H2L12 6l10 11z"
    className="fill-white"
    style={{ filter: 'drop-shadow(1px -1px 1px rgb(207, 217, 222))' }}
  />
</svg>

        </div>

        {/* Dropdown box */}
        <div className="my-2 rounded-sm bg-white">
            <button className="text-gray-800 p-2 text-sm font-medium w-full text-left hover:bg-slate-300" onClick={()=>LogoutLogic()}>Logout</button>
        </div>
    </div>
    </>)}