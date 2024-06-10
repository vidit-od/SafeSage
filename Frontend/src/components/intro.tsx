export function Intro(){
    return(
        <div className="md:w-3/5 py-20 md:py-9  pr-10">
                    <div className="text-10xl font-semibold font-space leading-none">
                        <div className=" opacity-0 pointer-events-none absolute md:opacity-100 md:relative ">
                            Thoughts & <br />
                            ideas around <br /> 
                            the things <br />
                            that actually <br /> 
                            matter.
                        </div>
                        <div className=" relative md:opacity-0 md:pointer-events-none md:absolute">
                            Thoughts &
                            ideas around 
                            the things
                            that actually 
                            matter.
                        </div>
                    </div>
                    <div className="flex justify-start my-5 w-full">
                        <div className=" bg-gray-100 px-5 flex rounded-full items-center w-2/3">
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5"><path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" /></svg>

                            </div>
                            <input type="text" name="" id="" className=" bg-transparent outline-none mx-2 w-full" placeholder="Search title or keyword here"/>
                        </div>
                        <ExploreButton/>
                    </div>
                </div>
    )
}

const ExploreButton = ()=>{
    return (
        <button className="px-5 py-3 mx-2 bg-blue-custom1 text-white rounded-full transition-all duration-500 flex justify-center items-center group relative">
            <div className="flex justify-center items-center translate-x-2 transition-all duration-300 group-hover:translate-x-0">
                Explore
                <div className=" translate-y-px opacity-0 -translate-x-3 group-hover:translate-x-1 transition-all group-hover:opacity-100 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5"><path fillRule="evenodd" d="M15.28 9.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L13.69 10 9.97 6.28a.75.75 0 0 1 1.06-1.06l4.25 4.25ZM6.03 5.22l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L8.69 10 4.97 6.28a.75.75 0 0 1 1.06-1.06Z" clipRule="evenodd" /></svg>
                </div>
            </div>
        </button>
    )
}