import { getCursorFromDOM } from "./blogWriteHelpers";
import { Tools, ToolKitProps } from "./blogWriteTypes";

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

export const ToolKit = ({applyEffect, editorRef}: ToolKitProps)=>{

    return (
        <div className="mx-5 my-2 p-2 bg-gray-toolkit shadow-sm rounded-full flex justify-center">
            { myTools.tools.map((tool, index)=>(
                <button
                    key={index}
                    onClick={()=> {
                        const sel = window.getSelection();
                        if (sel && !sel.isCollapsed){
                            const startCursor = getCursorFromDOM(editorRef.current!);
                            sel.collapseToEnd();
                            const endCursor = getCursorFromDOM(editorRef.current!);
                            if(!startCursor || !endCursor) return;

                            applyEffect(tool.effect,startCursor,endCursor);
                        }
                    }} 
                    className={`px-2 py-1 rounded hover:bg-gray-200 ${tool.style}`}>
                    {tool.symbol}
                </button>
            ))}
        </div>
    )
}