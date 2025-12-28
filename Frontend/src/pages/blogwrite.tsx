import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { createPost } from '@vidit-od/common-app'
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useratom } from "../store/atom/useratom";
import { Logo } from "../components/navbar";
const API = import.meta.env.VITE_API_BASE_URL;

export function BlogWrite(){
    const [title,setTitle] = useState('');
    
    return(
        <div className="h-screen flex flex-col bg-[#f9fbf8]">
            <BlogWriteNavbar title={title} state={(title.length < 5)? false : true} setTitle={setTitle} />
            <ToolKit/>
            <BlogCanvas contentFromDB="start writing"/>
        </div>
    )
}

interface Blog{
    title: string,
    state: boolean,
    setTitle: React.Dispatch<React.SetStateAction<string>>
}
const BlogWriteNavbar: React.FC<Blog> = ({title, state, setTitle})=>{
    const navigate = useNavigate()
    return(
        <div className="snap-start w-full py-2 px-5 md:px-10 lg:px-20 flex justify-between items-center">
            <div onClick={()=> navigate("/blog")} className=" cursor-pointer">
                <Logo/>
            </div>

            <input type="text" value={title} placeholder="Title" onChange={e=>{setTitle(e.target.value)}} className=" outline-none focus:outline-none flex justify-between font-bold text-xl" />

            <NavLinks title ={title} state={state} setTitle={setTitle}/>
        </div>
    )
}

const NavLinks:React.FC<Blog> = ({state})=>{
    const user = useRecoilValue(useratom);
    const navigate = useNavigate();

    const stories = useRef<HTMLButtonElement>(null);
    const publishbutton = useRef<HTMLButtonElement>(null);
    const loader = useRef<HTMLDivElement>(null);
    const name = useRef<HTMLDivElement>(null);
    if( !user || !user.name ) return ( <></>)

    useEffect(()=>{
        if( !state ){
            if( publishbutton.current) publishbutton.current.disabled = true;
        }
        else{
            if( publishbutton.current) publishbutton.current.disabled = false;
        }
    },[state]);

    const publishblog = async()=>{
        console.log("Publish attempt")
    }

    return(
        <div className="opacity-0 pointer-events-none absolute md:opacity-100 md:pointer-events-auto md:relative flex justify-between items-center">
        <button className="mx-4 transition-all duration-75 hover:border-b-2 border-black" ref={stories} onClick={()=>navigate('/stories')}>Our Stories</button>
        <button className="mx-4 transition-all duration-200 bg-black px-2 md:px-2 md:py-1 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center" ref={publishbutton} onClick={()=>publishblog()}>
            <div className="transition-all duration-100 translate-x-5" ref={name}>
                Publish
            </div>
            <div className="w-5 h-5 rounded-full ml-4 border-4 border-gray-500 border-l-green-500 animate-rotate right-12 pointer-events-none opacity-0" ref={loader}></div>
        </button>
        <button className="w-9 h-9 flex justify-center items-center border-2 border-black bg-black text-white border-solid rounded-full">{user.name[0].toString().toUpperCase()}</button>
    </div>
    )
}

const ToolKit = () => {
  const applyStyle = (command) => {
    document.execCommand(command);
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b bg-white">
      
      {/* Bold */}
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => applyStyle("bold")}
        className="px-2 py-1 rounded hover:bg-gray-200 font-bold"
      >
        B
      </button>

      {/* Italic */}
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => applyStyle("italic")}
        className="px-2 py-1 rounded hover:bg-gray-200 italic"
      >
        I
      </button>

      {/* Underline */}
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => applyStyle("underline")}
        className="px-2 py-1 rounded hover:bg-gray-200 underline"
      >
        U
      </button>

      {/* Strike */}
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => applyStyle("strikeThrough")}
        className="px-2 py-1 rounded hover:bg-gray-200"
      >
        S
      </button>
    </div>
  );
};


const BlogCanvas =({contentFromDB} : {contentFromDB:string})=>{

    const [content,setContent] = useState("");
    const editorRef = useRef<HTMLDivElement | null>(null);
    useEffect(()=>{
        if (editorRef.current) {
            editorRef.current.innerHTML = contentFromDB
        }
    },[])

    useEffect(()=>{
        console.log(content)
    }, [content])
    return(
        <div className=" flex-1 bg-[#f9fbf8] p-5">
            <div 
                ref={editorRef} 
                contentEditable 
                suppressContentEditableWarning 
                onInput={e=>{setContent(e.currentTarget.innerHTML)}} 
                className=" w-full h-full p-2 rounded-md outline-none focus:outline-none cursor-text bg-white shadow-md">
            </div>
        </div>
    )
}
