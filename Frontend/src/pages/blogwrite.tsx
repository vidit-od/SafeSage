export function BlogWrite(){
    const textrows = 16;
    return(
        <div>
            <div className="w-full">
            <div className=" bg-gray-100 p-5 flex justify-between items-center shadow-md">
                    <div className="flex justify-center ml-20">
                        <div className=" font-space text-5xl italics font-extrabold rotate-90">(:)</div>
                        <div className="text-black ml-1 text-xl font-bold font-space flex items-center">
                            SafeSage
                        </div>
                    </div>
                    <div className="flex justify-between items-center mr-10">
                        <button className="bg-green-500 px-7 py-1 rounded-full text-white mx-2">Publish</button>
                        <button className="w-7 h-7 bg-gray-500 rounded-full flex justify-center items-center mx-2 text-white"></button>
                        <div className="w-7 h-7 bg-gray-500 rounded-full flex justify-center items-center mx-2 text-white">V</div>
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center px-20 py-5 pb-0">
                <div className="absolute -translate-x-full py-2">Title</div>
                <input type="text " name="" id="" placeholder="Title" className=" outline-none w-screen translate-x-5 p-2 rounded-md text-3xl font-bold"/>
            </div>
            <div className="w-full flex px-20 py-5 pb-0">
                <div className="absolute -translate-x-full py-2">Content</div>
                <textarea name="" id="" rows={textrows} className=" outline-none w-screen translate-x-5 p-2 h-fit border-2 border-gray-300 border-solid rounded-md" placeholder="Tell your story..."/>
            </div>
        </div>
    )
}