export function TrendingSkeleton(){
    return (
        <div className="md:w-2/5 py-9 font-space">
            <div className=" font-semibold">Trending on Safesage</div>
            <div className="bg-white flex flex-col justify-center">
                <BlogCard/>
                <BlogCard/>
            </div>
        </div>
    )
}

const BlogCard:React.FC = ()=>{
    return (
        <div className="relative my-5 bg-gray-100 p-2 rounded-md">
            <div className="w-full flex md:flex-col">
                <div className="relative w-full md:h-44 overflow-hidden">
                    <div className="w-full md:h-44 before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent bg-gray-300 rounded-md before:absolute before:block before:w-full before:h-full before:bg-grad before:-translate-x-full before:animate-skeleton before:opacity-60"/>
                </div>
                <div className="flex flex-col justify-between">
                    <div className=" flex flex-col md:flex-row py-2">
                        <div className="md:w-3/5 mr-4 w-full font-bold md:text-xl line-clamp-2 object-cover  relative before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent bg-gray-300 rounded-md before:absolute before:block before:w-full before:h-full before:bg-grad before:-translate-x-full before:animate-skeleton before:opacity-60">
                        </div>
                        <div className="md:w-2/5 w-full flex md:flex-col text-right">
                            <div className="mr-2 md:mr-0 mb-1 text-transparent overflow-hidden relative before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent bg-gray-300 rounded-md before:absolute before:block before:w-full before:h-full before:bg-grad before:-translate-x-full before:animate-skeleton before:opacity-60">{'09'}</div>
                            <div className="mt-1 text-transparent  overflow-hidden relative before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent bg-gray-300 rounded-md before:absolute before:block before:w-full before:h-full before:bg-grad before:-translate-x-full before:animate-skeleton before:opacity-60">{'june 2024'}</div>
                        </div>
                    </div>
                    <div className="md:justify-between flex  justify-between flex-wrap">
                        <div className="h-4 text-transparent  overflow-hidden relative before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent bg-gray-300 rounded-md before:absolute before:block before:w-full before:h-full before:bg-grad before:-translate-x-full before:animate-skeleton before:opacity-60">{'author'}</div>
                        <div className="h-4 text-transparent  overflow-hidden relative before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent bg-gray-300 rounded-md before:absolute before:block before:w-full before:h-full before:bg-grad before:-translate-x-full before:animate-skeleton before:opacity-60">{'5'}m read</div>
                        <div className="h-4 text-transparent  overflow-hidden relative before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent bg-gray-300 rounded-md before:absolute before:block before:w-full before:h-full before:bg-grad before:-translate-x-full before:animate-skeleton before:opacity-60">{'tag1 tag2 '}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}