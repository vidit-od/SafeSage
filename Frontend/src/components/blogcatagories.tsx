export function BlogCatagories(){
    
const blogCategories = ["Productivity","Motivation","Technology","Gadgets and Reviews","Software Tutorials","Coding and Programming","Lifestyle","Travel","Food and Recipes","Fitness and Health","Fashion and Beauty","Education","Study Tips","Online Courses",
  ];
    return(
        <div className="w-full bg-orange-100 py-10 text-center overflow-hidden">
            <div className=" font-bold font-space text-3xl">Blog Category</div>
            <div className=" w-fit">
            <div className="flex items-center animate-catagories hover:pause">
                {blogCategories.map(function(i,index){
                    return (
                    <div className="px-20 w-fit flex items-center relative py-10 my-5 justify-center" key={index}>
                        <div className="bg-orange-200 absolute w-1 h-full left-0 rotate-30"></div>
                        <p className=" whitespace-nowrap text-xl font-thin">{i}</p>
                    </div>
                    )
                })}
                {blogCategories.map(function(i,index){
                    return (
                    <div className="px-20 w-fit flex items-center relative py-10 my-5 justify-center" key={index+10}>
                        <div className="bg-orange-200 absolute w-1 h-full left-0 rotate-30"></div>
                        <p className=" whitespace-nowrap text-xl font-thin">{i}</p>
                    </div>
                    )
                })}
            </div>
            </div>
        </div>
    )
}