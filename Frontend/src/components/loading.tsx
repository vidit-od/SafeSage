import { useEffect, useRef } from "react"

export function LoadingComponent(state:boolean){
    const logo = useRef<HTMLDivElement>(null);
    const progress = useRef<HTMLDivElement>(null);
    const animateLogo= async()=>{
        if(state) return
        await setInterval(async()=>{
            if(! logo.current) return
            logo.current.innerHTML = "( )" 
            await new Promise(r=>setTimeout(r,100))
            logo.current.innerHTML = "(:)"
            await new Promise(r=>setTimeout(r,300))
            logo.current.innerHTML = "( )" 
            await new Promise(r=>setTimeout(r,100))
            logo.current.innerHTML = "(:)"
            
        },5000);
    }
    const successAnimation = async()=>{
        if(!progress.current) return
        if(!logo.current) return
        progress.current.style.animation = "none"
        progress.current.style.left = "0%"
        progress.current.style.width = "100%"    
    }
    useEffect(()=>{
        if(!state){
            animateLogo()
        }
        else{
            successAnimation();
        }
    },[state])
    return (
        <div className=" absolute w-full h-full bg-black overflow-hidden text-white flex justify-center items-center font-bold text-9xl font-space flex-col">
            {/* Logo */}
            <div className="relative animate-logo transition-all duration-1000 w-96 h-96 flex justify-center items-center rotate-90">
                <div className="absolute top-0 bg-white w-block h-14 -rotate-90 translate-y-30"></div>
                <div className="" ref={logo}>(:)</div>
                <div className="absolute bottom-0 bg-white w-block h-14 -rotate-90 -translate-y-24"></div>
            </div>

            {/* loading bar */}
            <div className="w-4/5 h-1 bg-gray-500 rounded-full mt-5 overflow-hidden relative -translate-y-24">
                <div className="w-1/3 h-full bg-white absolute transition-all duration-200 left-1/3 animate-loadbar" ref={progress}></div>
            </div>
        </div>
    )
}