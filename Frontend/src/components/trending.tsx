import img1 from '../assets/4.jpg'
import img2 from '../assets/3.jpg'

export function Trending(){
    return (
        <div className="md:w-2/5 py-9 font-space">
                    <div className=" font-semibold">Trending on Safesage</div>
                    <div className="bg-white flex flex-col justify-center">
                        
                    <div className="relative my-5">
                            <div className="w-full flex md:flex-col">
                                <div className="relative w-full md:h-44">
                                    <img src={img1} alt="" className="w-full md:h-44"/>
                                    <div className="absolute bg-black p-2 md:p-4 rounded-full md:right-0 top-1/2 md:translate-x-1/2 -translate-y-2/3 md:left-auto left-0 -translate-x-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className=" size-5 md:size-7"><path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd" /></svg>
                                    </div>
                                </div>
                                <div className="px-3 flex flex-col justify-between">
                                <div className=" flex flex-col md:flex-row">
                                    <div className="md:w-3/5 w-full font-bold md:text-xl line-clamp-2 object-cover">
                                        How Do You Write A Good Brand Story 
                                    </div>
                                    <div className="md:w-2/5 w-full flex md:flex-col text-right">
                                        <div className="mr-2">09</div>
                                        <div className="">june 2024</div>
                                    </div>
                                </div>
                                <div className="md:justify-start flex border-t-2 justify-between flex-wrap">
                                    <div className="md:mr-5">author</div>
                                    <div className="md:mr-5">5m read</div>
                                    <div className="md:mr-5">tags</div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative my-5">
                            <div className="w-full flex md:flex-col">
                                <div className="relative w-full md:h-44">
                                    <img src={img2} alt="" className="w-full md:h-44"/>
                                    <div className="absolute bg-black p-2 md:p-4 rounded-full md:right-0 top-1/2 md:translate-x-1/2 -translate-y-2/3 md:left-auto left-0 -translate-x-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className=" size-5 md:size-7"><path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd" /></svg>
                                    </div>
                                </div>
                                <div className="px-3 flex flex-col justify-between">
                                <div className=" flex flex-col md:flex-row">
                                    <div className="md:w-3/5 w-full font-bold md:text-xl line-clamp-2 object-cover">
                                        How Do You Write A Good Brand Story 
                                    </div>
                                    <div className="md:w-2/5 w-full flex md:flex-col text-right">
                                        <div className="mr-2">09</div>
                                        <div className="">june 2024</div>
                                    </div>
                                </div>
                                <div className="md:justify-start flex border-t-2 justify-between flex-wrap">
                                    <div className="md:mr-5">author</div>
                                    <div className="md:mr-5">5m read</div>
                                    <div className="md:mr-5">tags</div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}