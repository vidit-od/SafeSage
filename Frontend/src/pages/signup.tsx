import { Link, useNavigate } from "react-router-dom"
import img from '../assets/1.jpg' 
import { useRef, useState } from "react"
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export function Signup(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [passwordState, setPasswordState]= useState(true)
    const navigate = useNavigate();
    const loader = useRef<HTMLDivElement>(null);

    const createUser = async()=>{
        try{
            if(loader.current == null) return
            loader.current.style.opacity = "1";
            const response = await axios.post(`${API}/api/v1/user/signup`,
            {
                name,
                email,
                password    
            })
            localStorage.setItem('token',response.data.token)
            loader.current.style.border = "none";
            loader.current.style.animation = "none";
            loader.current.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7 fill-green-500">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
            </svg>`
            await new Promise(r=>setTimeout(r,1000));
            navigate('/blog');
        }   
        catch(e){
            if(loader.current) {
                loader.current.style.border = 'none'
                loader.current.style.animation = "none"
                loader.current.innerHTML = 
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="size-7 fill-red">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                </svg>`
                setTimeout(()=>{
                    if(loader.current == null) return 
                    loader.current.style.opacity = "0"
                    loader.current.style.border = '4px solid rgb(107 114 128)'
                    loader.current.style.borderLeft = '4px solid rgb(34 197 94)'
                    loader.current.style.animation = "circle 1s linear infinite"
                    loader.current.innerHTML = ``
                },5000)
            }
        }
    }
    return (
        <div className="flex w-full h-full absolute overflow-hidden justify-center items-center p-5 bg-slate-200">

            {/* left inputs  */}
            <div className=" bg-white h-fit p-5 w-full transition-width duration-200 text-center min-w-fit max-w-fit rounded-xl shadow-xl overflow-hidden flex justify-center items-center
            md:w-1/2 md:rounded-l-xl md:rounded-r-none md:h-full">
                <div className="">
                <div className="font-bold text-2xl py-4">
                    Join Our Community Today
                </div>

                <div className=" font-light">
                Stay updated with the latest posts and exclusive content. <br />
                Connect, share, and grow with fellow enthusiasts
                </div>

                <div className="flex flex-col text-left mt-4">
                    
                    <div className="flex flex-col w-full text-left my-3">
                        <div className="block mb-2 text-sm font-medium text-gray-900">
                            Name
                        </div>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"/>
                    </div>

                    <div className="flex flex-col w-full text-left my-3">
                        <div className="block mb-2 text-sm font-medium text-gray-900">
                            Email
                        </div>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"/>
                    </div>

                    <div className="flex flex-col w-full text-left my-3">
                        <div className="block mb-2 text-sm font-medium text-gray-900">
                            Password
                        </div>
                        <div className="flex justify-center items-center relative">
                            {(passwordState)?
                            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"/>:
                            <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"/>}
                            <div className="absolute right-0 -translate-x-2">
                                <button onClick={()=> setPasswordState(!passwordState)} className="flex justify-center items-center">
                                {(passwordState)?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-gray-500">
                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                </svg>:
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-gray-500">
                                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                              </svg>
                              }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="w-60 bg-black p-2 rounded-md m-auto mt-4 text-white flex justify-center items-center relative" onClick={createUser}>
                    <div className="flex justify-center items-center">
                        Sign up
                    </div>
                    <div className="absolute w-7 h-7 rounded-full ml-4 border-4 border-gray-500 border-l-green-500 animate-rotate right-12 pointer-events-none opacity-0" ref={loader}>
                    </div>
                </button>
                <div className="">
                    Already a user ? <Link to="/signin" className=" underline font-semibold"> Login</Link>
                </div>
                </div>
            </div>

            {/* Right image */}
            <div className="relative w-0 h-full overflow-hidden rounded-r-xl shadow-xl transition-width duration-200 
            md:w-fit">
                <img src={img} alt="img" className=" w-full h-full object-left object-cover pointer-events-none"/>
                
                <div className="absolute top-2 w-full text-white z-10 flex justify-center ml-3">
                        <div className="flex justify-between w-full items-center">
                            <div className="flex pointer-events-none">
                                <div className=" font-space text-3xl italics font-extrabold rotate-90">(:)</div>
                                <div className="text-white ml-1 text-xl font-bold font-space flex items-center">
                                SafeSage
                                </div>
                            </div>
                        </div><div className="flex justify-end items-center">
                            <button className="bg-white z-10 w-40 p-1 text-black rounded-xl mx-5" onClick={()=> navigate('/blog')}>
                                Continue as Guest
                            </button>
                        </div>
                </div>

                <div className="absolute w-full h-full bg-semi-black top-0  text-white flex flex-col justify-end p-5 items-end">
                    <div className="w-full font-space text-8xl translate-y-16 -translate-x-2">"</div>
                    <div className=" font-extrabold text-3xl leading-8 pl-2">Anyone who stops learning is old, whether at twenty or eighty.
                    </div>
                    <div className="w-full font-extralight opacity-70 text-right">
                        ―  Henry Ford 
                    </div>
                </div>
            </div>
        </div>
    )
}