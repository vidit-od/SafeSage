import { MainNavbar } from "../components/navbar"
import { Intro } from "../components/intro"
import { Trending } from "../components/trending"
import { BlogCatagories } from "../components/blogcatagories"
export function Blog(){
    //return LoadingComponent(false)
    return(
        <div className=" relative">
            <MainNavbar/>
            <div className="flex relative w-full flex-wrap  flex-col md:flex-row px-5 md:px-10 lg:px-20">
                <Intro/>
                <Trending/>
            </div>
            <BlogCatagories/>
        </div>
    )
}