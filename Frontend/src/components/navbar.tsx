export function MainNavbar(){
    return(
        <div className="w-full py-2 px-5 md:px-10 lg:px-20 flex justify-between items-center">
            <div className="flex justify-center">
                        <div className=" font-space text-3xl italics font-extrabold rotate-90">(:)</div>
                        <div className=" ml-1 text-xl font-bold font-space flex items-center">
                            Safesage.
                        </div>
            </div>
            <div className="flex justify-center items-center h-full md:opacity-0 md:pointer-events-none md:absolute">
                <button className="px-7 py-1 border-2 border-black border-solid rounded-full">Sign in</button>
            </div>

            <div className="opacity-0 pointer-events-none absolute md:opacity-100 md:pointer-events-all md:relative flex justify-between items-center">
                <div className=" font-bold mx-4">Home</div>
                <div className="mx-4">Our Stories</div>
                <div className="mx-4">Start Writing</div>
                <div className="px-10 py-2 border-2 border-black border-solid rounded-full">Sign in</div>
            </div>
        </div>
    )
}