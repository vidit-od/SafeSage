import React, { useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useratom } from "../store/atom/useratom";
import { Logo } from "../components/navbar";
import { GuestLinks } from "../components/navbar";
import { BlogCanvas } from "../components/blogWriteCanvas";
import { ToolKit } from "../components/blogWriteToolkit";
import { ToolButtons,DocumentModle, Cursor,Effect} from "../components/blogWriteTypes"
import { countLeadingSpaces, countTrailingSpaces, splitAndapplyEffect} from "../components/blogWriteHelpers"


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
        {user && user.name && <button className="mx-4 transition-all duration-200 bg-black px-2 md:px-2 md:py-1 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center" ref={publishbutton} onClick={()=>publishblog()}>
            <div className="transition-all duration-100 translate-x-5" ref={name}>
                Publish
            </div>
            <div className="w-5 h-5 rounded-full ml-4 border-4 border-gray-500 border-l-green-500 animate-rotate right-12 pointer-events-none opacity-0" ref={loader}></div>
        </button>}
        {user && user.name && <button className="w-9 h-9 flex justify-center items-center border-2 border-black bg-black text-white border-solid rounded-full">{user.name[0].toString().toUpperCase()}</button>}
        {!user.name && <GuestLinks/>}
    </div>
    )
}

export function BlogWrite(){
    const [title,setTitle] = useState('');
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [doc, setDoc] = useState<DocumentModle>({
        blocks: [{
            type: "paragraph",
            children: [
              { text: "Hello", marks: { bold: true } },
              { text: " world", marks: { bold: false} }
            ]}
        ]
        }
    );
    const [cursor, setCursor] = useState<Cursor>({
        blockIndex: 0,
        childIndex: 1,   // " world"
        offset: 6        // end of " world"
    });
    const [ToolButtons, setToolButtons] = useState<ToolButtons>({
        bold : false,
        italic : false,
        underline : false,
        strike : false,
    });

    
    function applyEffect(effect: Effect, startCursor : Cursor, endCursor: Cursor) {
        if (!editorRef.current) return;

        console.log("Range : ",startCursor , endCursor);

        // within block split
        if(startCursor.blockIndex === endCursor.blockIndex && startCursor.childIndex === endCursor.childIndex){
            const startText = doc.blocks[startCursor.blockIndex].children[startCursor.childIndex].text;
            const endText = doc.blocks[endCursor.blockIndex].children[endCursor.childIndex].text;

            const startShift = countLeadingSpaces(startText);
            const endShift = countTrailingSpaces(endText);

            const startIsEmpty = startCursor.offset === 0 || startCursor.offset <= startShift;
            const endIsEmpty = endCursor.offset === endText.length || endCursor.offset >= endText.length - endShift;
                
            if (startIsEmpty && endIsEmpty) {
                setDoc(prevDoc => {
                    const newBlocks = prevDoc.blocks.map((block, bIndex) => {
                    if (bIndex !== startCursor.blockIndex) return block;
                    
                    return {
                        ...block,
                        children: block.children.map((c, cIndex) => {
                        if (cIndex !== startCursor.childIndex) return c;
                            return {
                            ...c,
                            marks: {
                                ...c.marks,
                                [effect]: !c.marks?.[effect],
                            },
                        };
                        }),
                    };
                    });
                
                return {
                    ...prevDoc,
                    blocks: newBlocks,
                };
                });
          
                return;
            }

            setDoc(prevDoc => {
              const { blockIndex, childIndex } = startCursor;
              const block = prevDoc.blocks[blockIndex];
              const child = block.children[childIndex];
                                
              const newChildren = [
                ...block.children.slice(0, childIndex),
                ...splitAndapplyEffect(
                    effect,
                  child,
                  startCursor.offset,
                  endCursor.offset
                ),
                ...block.children.slice(childIndex + 1),
              ];
            
              const newBlocks = prevDoc.blocks.map((b, i) =>
                i === blockIndex
                  ? { ...b, children: newChildren }
                  : b
              );
            
              return {
                ...prevDoc,
                blocks: newBlocks,
              };
            });

            return;
        }
            // for all other case recursively break and applyEffect till we reach 
        else if(startCursor.blockIndex === endCursor.blockIndex && startCursor.childIndex != endCursor.childIndex){
            const blockIndex = startCursor.blockIndex;
            const block = doc.blocks[blockIndex];

            applyEffect(effect,startCursor,{
                blockIndex,
                childIndex: startCursor.childIndex,
                offset: block.children[blockIndex].text.length
            })

            for(let i = startCursor.childIndex + 1; i < endCursor.childIndex; i++){
                applyEffect(effect, 
                    {
                        blockIndex,
                        childIndex: i,
                        offset : 0
                    },{
                        blockIndex,
                        childIndex: i,
                        offset: block.children[i].text.length
                    })
            }

            applyEffect(effect, {
                blockIndex,
                childIndex: endCursor.childIndex,
                offset: 0
            }, endCursor);
        }    
    }
    return(
        <div className="h-screen flex flex-col bg-[#f9fbf8]">
            <BlogWriteNavbar title={title} state={(title.length < 5)? false : true} setTitle={setTitle} />
            <ToolKit applyEffect = {applyEffect} editorRef={editorRef} Toolbuttons = {ToolButtons} setToolButtons = {setToolButtons}/>
            <BlogCanvas
              editorRef={editorRef}
              doc={doc}
              setDoc={setDoc}
              cursor={cursor}
              setCursor={setCursor}
              setToolButtons = {setToolButtons}
            />
        </div>
    )
}