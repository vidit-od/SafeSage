import axios from "axios";
import React, { useEffect, useRef, useState,useLayoutEffect } from "react";
import { createPost } from '@vidit-od/common-app'
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useratom } from "../store/atom/useratom";
import { Logo } from "../components/navbar";
import { GuestLinks } from "../components/navbar";
const API = import.meta.env.VITE_API_BASE_URL;

type TextNode = {
    text : string;
    marks : {
        bold : boolean
    }
}

type BlockNode = {
    type : "paragraph" | "heading";
    children : TextNode[];

}

type DocumentModle = {
    blocks : BlockNode[];
}


export function BlogWrite(){
    const [title,setTitle] = useState('');
    
    return(
        <div className="h-screen flex flex-col bg-[#f9fbf8]">
            <BlogWriteNavbar title={title} state={(title.length < 5)? false : true} setTitle={setTitle} />
            <ToolKit/>
            <BlogCanvas/>
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

const ToolKit = ()=>{

    interface Tool {
        name : String,
        symbol? : String,
        style? : String,
        effect: Effect,
    }
    interface Tools{
        tools : Tool[]
    }
    type Effect =
            |"bold"
            | "italic"
            | "underline"
            | "color"
            | "fontSize"
            | "Strike";

    const myTools : Tools = {
        tools:[
            {
                name: "Bold",
                symbol: "B",
                style:"font-bold",
                effect:"bold"
            },
            {
                name: "Italic",
                symbol: "I",
                style: "italic",
                effect:"italic"
            },
            {
                name: "Underline",
                symbol: "U",
                style: "underline",
                effect:"underline"    
            },
            {
                name: "Strike",
                symbol: "S",
                effect:"Strike"
            }
        ]
    }

    const ApplyEffect = (effect?: Effect) => {
  if (!effect) return;

  switch (effect) {
    case "bold":
      applyEffect({ fontWeight: "bold" });
      break;

    case "italic":
      applyEffect({ fontStyle: "italic" });
      break;

    case "underline":
      applyEffect({ textDecoration: "underline" });
      break;

    case "color":
      applyEffect({ color: "#ef4444" });
      break;

    case "fontSize":
      applyEffect({ fontSize: "20px" });
      break;
  }
};

    const applyEffect=(style: Partial<CSSStyleDeclaration>)=>{
        const selection = window.getSelection();
        if(!selection || selection.rangeCount == 0) return;

        const range = selection.getRangeAt(0);
        if(range.collapsed) return;
        
        const span = document.createElement("span");
        Object.assign(span.style, style);

        const content = range.extractContents();
        span.appendChild(content);
        range.insertNode(span);

        selection.removeAllRanges();
        selection.selectAllChildren(span);
    }
    return (
        <div className="mx-5 my-2 p-2 bg-gray-toolkit shadow-sm rounded-full flex justify-center">
            { myTools.tools.map((tool, index)=>(
                <button
                    key={index}
                    onClick={()=> ApplyEffect(tool.effect)} 
                    className={`px-2 py-1 rounded hover:bg-gray-200 ${tool.style}`}>
                    {tool.symbol}
                </button>
            ))}
        </div>
    )
}

function renderTextNode(
  node: TextNode,
  blockIndex: number,
  childIndex: number
) {
  const Tag = node.marks.bold ? "strong" : "span";

  return (
    <Tag
      key={childIndex}
      data-block-index={blockIndex}
      data-child-index={childIndex}
    >
      {node.text}
    </Tag>
  );
}

function renderBlock(block: BlockNode, blockIndex: number) {
  return (
    <p key={blockIndex}>
      {block.children.map((node, childIndex) =>
        renderTextNode(node, blockIndex, childIndex)
      )}
    </p>
  );
}

function restoreCaret(
  root: HTMLElement,
  cursor: Cursor
) {
  const { blockIndex, childIndex, offset } = cursor;

  const el = root.querySelector(
    `[data-block-index="${blockIndex}"][data-child-index="${childIndex}"]`
  );

  if (!el || !el.firstChild) return;

  const range = document.createRange();
  const selection = window.getSelection();
  if (!selection) return;
  
  const textNode = el.childNodes[0];
  if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;
  const textLength = textNode.textContent?.length ?? 0;
  const safeOffset = Math.min(offset, textLength);

  range.setStart(textNode, safeOffset);
  range.collapse(true);

  selection.removeAllRanges();
  selection.addRange(range);
}

function getCursorFromDOM(
  root: HTMLElement
): Cursor | null {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  const container = range.startContainer;
  const offset = range.startOffset;

  // We only support text nodes
  if (container.nodeType !== Node.TEXT_NODE) return null;

  const parentEl = container.parentElement;
  if (!parentEl) return null;

  const blockIndex = parentEl.getAttribute("data-block-index");
  const childIndex = parentEl.getAttribute("data-child-index");

  if (blockIndex === null || childIndex === null) return null;

  return {
    blockIndex: Number(blockIndex),
    childIndex: Number(childIndex),
    offset
  };
}

type Cursor = {
    blockIndex: number;
    childIndex: number;
    offset: number;
};

function updateChar(
  doc: DocumentModle,
  cursor: Cursor,
  e: InputEvent
): { doc: DocumentModle; cursor: Cursor } {
    const { blockIndex, childIndex, offset } = cursor;

    const block = doc.blocks[blockIndex];
    const node = block.children[childIndex];
    
    if(e.inputType === 'deleteContentBackward'){
        if(blockIndex == 0 && childIndex == 0 && offset == 0){ 
            return {doc, cursor};
        }
        else if(offset > 0){
            const updateNode = {
                ... node,
                text : 
                node.text.slice(0,offset-1) + node.text.slice(offset)
            }
            const newChildren = [...block.children];
            newChildren[childIndex] = updateNode;
            const newDoc: DocumentModle = {
                blocks: doc.blocks.map((b,i)=>
                    i === blockIndex ? {...block, children: newChildren} :b
                )
            }

            const newCursor: Cursor = {
                blockIndex,
                childIndex,
                offset: offset - 1,
            };

            return {doc : newDoc, cursor: newCursor};
        }
        else if(offset == 0 && childIndex > 0){
            const prevNode = block.children[childIndex-1];
            const currNode = block.children[childIndex];
            const newPrevNode = {
                ... prevNode,
                text : prevNode.text.slice(0,-1)
            }
            
            const newChildren = [...block.children];
            
            if (currNode.text.length == 0) {
                newChildren.splice(childIndex - 1, 1);
            }
            newChildren[childIndex - 1] = newPrevNode;
            
            const newDoc: DocumentModle = {
                blocks: doc.blocks.map((b,i)=>
                    i === blockIndex ? {...block, children: newChildren} :b
                )
            }
            const newCursor: Cursor = {
                blockIndex,
                childIndex:childIndex -1,
                offset: newPrevNode.text.length,
            };

            return {doc : newDoc, cursor: newCursor};
        }
        else if( offset == 0 && childIndex == 0 && blockIndex > 0){
            const prevBlock = doc.blocks[blockIndex - 1];
            const newChildIndex = prevBlock.children.length - 1;
            const newOffset = prevBlock.children[newChildIndex].text.length

            const currBlock = doc.blocks[blockIndex];
            
            const mergedChildren : TextNode[] = [
                ...prevBlock.children,
                ...currBlock.children
            ];
            
            const newPrevBlock :BlockNode = {
                ...prevBlock,
                children: mergedChildren
            };

            const newBlocks: BlockNode[] = [
                ...doc.blocks.slice(0, blockIndex -1),
                newPrevBlock,
                ...doc.blocks.slice(blockIndex+1)
            ]

            const newDoc : DocumentModle = {
                blocks: newBlocks
            }

            const newCursor: Cursor = {
                blockIndex : blockIndex - 1,
                childIndex: newChildIndex,
                offset: newOffset
            };
            return {doc: newDoc, cursor: newCursor};
        }
    }
    else if (e.inputType === "insertParagraph") {

        const leftText = node.text.slice(0, offset);
        const rightText = node.text.slice(offset);

            const beforeChildren = block.children.slice(0, childIndex);
            const afterChildren = block.children.slice(childIndex + 1);

            const updatedPrevChildren: TextNode[] = [
                ...beforeChildren,
                ...(leftText.length > 0
                    ? [{ ...node, text: leftText }]
                    : [{ ...node, text: " "}])
            ];

            const updatedPrevBlock: BlockNode = {
                ...block,
                children: updatedPrevChildren
            };

            const newChildren: TextNode[] = [
                ...(rightText.length > 0
                    ? [{ ...node, text: rightText }]
                    : []),
                ...afterChildren
            ];

            const newBlock: BlockNode = {
                type: "paragraph",
                children: newChildren.length > 0
                    ? newChildren
                    : [{ text: " ", marks: { bold: false } }]
            };

            const newBlocks: BlockNode[] = [
                ...doc.blocks.slice(0, blockIndex),
                updatedPrevBlock,
                newBlock,
                ...doc.blocks.slice(blockIndex + 1)
            ];

            const newDoc: DocumentModle = { blocks: newBlocks };

            const newCursor: Cursor = {
                blockIndex: blockIndex + 1,
                childIndex: 0,
            offset: 0
        };

        return { doc: newDoc, cursor: newCursor };
    }
    else if(e.data != null){
        const updatedNode = {
            ...node,
            text:
            node.text.slice(0, offset) +
            e.data +
            node.text.slice(offset)
        };
        const newChildren = [...block.children];
        newChildren[childIndex] = updatedNode;
        const newDoc: DocumentModle = {
          blocks: doc.blocks.map((b, i) =>
            i === blockIndex ? { ...b, children: newChildren } : b
          )
        };
   
        const newCursor: Cursor = {
            blockIndex,
            childIndex,
            offset: offset + 1
        };
        return { doc: newDoc, cursor: newCursor };
    }

    return {doc,cursor};
}

const BlogCanvas = () => {
    const [doc, setDoc] = useState<DocumentModle>({
    blocks: [
      {
        type: "paragraph",
        children: [
          { text: "Hello", marks: { bold: true } },
          { text: " world", marks: { bold: false} }
        ]
      }
    ]
    });
    const [cursor, setCursor] = useState<Cursor>({
    blockIndex: 0,
    childIndex: 1,   // " world"
    offset: 6        // end of " world"
    });
    const editorRef = useRef<HTMLDivElement | null>(null);
    useLayoutEffect(() => {
        if (editorRef.current) {
            const sel = window.getSelection();
            if (sel && !sel.isCollapsed) return;
            restoreCaret(editorRef.current, cursor);
        }
    }, [doc, cursor]);

    function handleSelectionChange() {
        if (!editorRef.current) return;

        const newCursor = getCursorFromDOM(editorRef.current);
        if (!newCursor) return;

        setCursor(newCursor);
    }

    useEffect(()=>{
        const el = editorRef.current;
        if(!el) return;

        const handler = (e: InputEvent)=>{
            e.preventDefault();
            if(e.inputType === null) return;

            setDoc(prevDoc =>{
                const result = updateChar(prevDoc, cursor, e);
                setCursor(result.cursor);
                return result.doc;
            });    
        }

        el.addEventListener("beforeinput", handler);

        return()=>{
            el.removeEventListener("beforeinput",handler);
        }
    },[cursor]);


  return (
    <div className="flex-1 bg-[#f9fbf8] p-5">
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onMouseUp={handleSelectionChange}
        onKeyUp={handleSelectionChange}
        className=" whitespace-pre-wrap w-full h-full p-2 rounded-md outline-none cursor-text bg-white shadow-md"
      >
        {doc.blocks.map(renderBlock)}
      </div>
    </div>
  );
};

