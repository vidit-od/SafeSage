import { Link } from "react-router-dom"
import img from '../assets/2.jpg' 
export function Signup(){
    return (
        <div className="flex w-full h-full absolute overflow-hidden justify-center items-center p-5 bg-slate-200">
            <div className=" bg-white h-full p-5 w-full transition-width duration-200 text-center min-w-fit max-w-fit rounded-xl shadow-xl md:w-1/2 md:rounded-l-xl md:rounded-r-none">
                
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
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"/>
                    </div>

                    <div className="flex flex-col w-full text-left my-3">
                        <div className="block mb-2 text-sm font-medium text-gray-900">
                            Email
                        </div>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"/>
                    </div>

                    <div className="flex flex-col w-full text-left my-3">
                        <div className="block mb-2 text-sm font-medium text-gray-900">
                            Password
                        </div>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"/>
                    </div>
                </div>

                <button className="w-60 bg-black p-2 rounded-md m-auto mt-4 text-white">
                    Sign up
                </button>
                <div className="">
                    Already a user ? <Link to="/singin" className=" underline text-purple-500"> Login</Link>
                </div>
            </div>
            <div className="relative pointer-events-none w-0 h-full overflow-hidden transition-width duration-200 md:w-fit rounded-r-xl shadow-xl">
                <img src={img} alt="img" className=" w-full h-full object-left object-cover"/>
                
                <div className="absolute w-full h-full bg-semi-black top-0  text-white flex flex-col justify-end p-5 items-end">
                    <div className="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur facere libero velit atque? Corporis, beatae ipsam nobis non aperiam consectetur exercitationem! Doloribus reiciendis commodi voluptas ipsa molestiae, numquam qui quisquam?
                    </div>
                    <div className="">
                        -anon
                    </div>
                </div>
            </div>
        </div>
    )
}