import { MainNavbar } from "../components/navbar"

export function Stories(){
    return (
        <div className="absolute w-full h-full ov">
            <div className="flex flex-wrap overflow-y-scroll h-full snap-y">
                <MainNavbar/>
                <IntroCard/>
                <BigCard/>
            </div>
        </div>
    )
}

const IntroCard = ()=>{
    return(
        <div className="h-1/3 w-full snap-none">
            <div className="font-space text-center text-5xl font-bold">Welcome to Safesage</div>
        </div>
    )
}
const BigCard = ()=>{
    return(
        <div className="h-2/3 w-full bg-gray-400 border-2 border-black border-solid snap-start">
            <h2>Title</h2>
            <p>Author: Author</p>
            <button>Read More</button>
        </div>
    )
}
