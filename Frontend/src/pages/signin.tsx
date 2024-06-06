import { Link } from "react-router-dom"
import img from '../assets/2.jpg' 
import { useState } from "react"
export function Signin(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [passwordState, setPasswordState]= useState(true)
    const color = 'white'; 
    return (
        <div className="flex w-full h-full absolute overflow-hidden justify-center items-center p-5 bg-slate-200">
            <div className=" bg-white h-fit p-5 w-full transition-width duration-200 text-center min-w-fit max-w-fit rounded-xl shadow-xl overflow-hidden flex justify-center items-center
            md:w-1/2 md:rounded-l-xl md:rounded-r-none md:h-full">
                <div className="">
                <div className="font-bold text-2xl py-4">
                Welcome Back! Log In to <br />Continue Your Journey
                </div>

                <div className=" font-light mb-10">
                    Sign in to explore new content and engage with fellow readers.
                </div>

                <div className="flex flex-col text-left mt-4">

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

                <button className="w-60 bg-black p-2 rounded-md m-auto mt-4 text-white">
                    Login
                </button>
                <div className="">
                    Don't have account ? <Link to="/signup" className=" underline font-semibold"> Signup</Link>
                </div>
                </div>
            </div>
            <div className="relative pointer-events-none w-0 h-full overflow-hidden rounded-r-xl shadow-xl transition-width duration-200 
            md:w-fit">
                <img src={img} alt="img" className=" w-full h-full object-left object-cover"/>
                <div className="absolute top-0 left-0 mt-5 ml-5 z-10 flex justify-center items-center">
                    <div className="w-7 h-7">
                        <svg viewBox="0 0 282 282" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="141" cy="141" r="131.5" stroke={color} stroke-width="19"/>
                    <path d="M132.271 132.271L123.543 141H106.503C106.769 122.067 122.067 106.769 141 106.503V123.543L132.271 132.271ZM106.503 142H123.543L132.271 150.729L141 159.457V176.496C122.067 176.231 106.769 160.933 106.503 142ZM142 123.543V106.503C160.933 106.769 176.231 122.067 176.496 141H159.457L150.729 132.271L142 123.543ZM159.457 142H176.496C176.231 160.933 160.933 176.231 142 176.496V159.457L150.729 150.729L159.457 142ZM142 133.125H149.168L142 140.293V133.125ZM141 133.125V140.293L133.832 133.125H141ZM133.125 149.168V142H140.293L133.125 149.168ZM133.832 149.875L141 142.707V149.875H133.832ZM149.168 149.875H142V142.707L149.168 149.875ZM149.875 149.168L142.707 142H149.875V149.168ZM149.875 133.832V141H142.707L149.875 133.832ZM133.125 133.832L140.293 141H133.125V133.832Z" fill={color} stroke={color}/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M172.656 97.4286L141 0L109.344 97.4286H6.90103L89.7787 157.643L58.1223 255.071L141 194.857L223.878 255.071L192.221 157.643L275.099 97.4286H172.656ZM172.656 97.4286H109.344L89.7787 157.643L141 194.857L192.221 157.643L172.656 97.4286Z" fill={color}/>
                        </svg>
                    </div>
                    <div className="text-white ml-2 text-2xl font-lobster">
                        SafeSage
                    </div>
                </div>
                <div className="absolute w-full h-full top-0 bg-semi-black text-white flex flex-col justify-end p-5 items-end">
                    <div className="w-full font-space text-8xl translate-y-16 -translate-x-2">"</div>
                    <div className=" font-extrabold text-3xl leading-8 pl-2">In learning you will teach, and in teaching you will learn.
                    </div>
                    <div className="w-full font-extralight opacity-70 text-right font-lobster">
                        ― Phil Collins
                    </div>
                </div>
            </div>
        </div>
    )
}