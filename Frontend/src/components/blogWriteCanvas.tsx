
import { useEffect,useLayoutEffect } from "react";
import {BlogCanvasProps} from "../components/blogWriteTypes"
import { restoreCaret, renderBlock,getCursorFromDOM} from "../components/blogWriteHelpers"
import {DocumentModle,Cursor,TextNode,BlockNode} from "./blogWriteTypes"

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

function deleteSelection(
    doc: DocumentModle,
    startCursor: Cursor,
    endCursor: Cursor,
):{doc: DocumentModle, cursor: Cursor}{

    // within same child node
    if(startCursor.blockIndex === endCursor.blockIndex && startCursor.childIndex === endCursor.childIndex){
        const blockIndex = startCursor.blockIndex;
        const childIndex = startCursor.childIndex;

        const block = doc.blocks[blockIndex]; 
        const node = block.children[childIndex];

        const newContent = node.text.slice(0,startCursor.offset) + node.text.slice(endCursor.offset);
        const updatedNode : TextNode = {
            ...node,
            text: newContent
        };

        const newChildren = [...block.children];
        newChildren[childIndex] = updatedNode;

        const newBlock: BlockNode = {
            ...block,
            children: newChildren.filter(n=> n.text.length > 0)
        };

        const newDoc : DocumentModle = {
            blocks : doc.blocks.map((b,i) =>
                i === blockIndex ? newBlock : b
            )
        };

        return { doc: newDoc, cursor: startCursor}
    }
    // within same block
    else if(startCursor.blockIndex === endCursor.blockIndex){
        const blockIndex = startCursor.blockIndex;
        const block = doc.blocks[blockIndex];

        const prevNode = block.children[startCursor.childIndex];
        const nextNode = block.children[endCursor.childIndex];

        const updatedPrevNode : TextNode = {
            ...prevNode,
            text : prevNode.text.slice(0, startCursor.offset)
        }

        const updatedNextNode : TextNode = {
            ...nextNode,
            text : nextNode.text.slice(endCursor.offset)
        }

        const beforeChildren = block.children.slice(0, startCursor.childIndex);
        const afterChildren = block.children.slice(endCursor.childIndex + 1);

        const middleChildren: TextNode[] = [
            ...(updatedPrevNode.text.length > 0 ? [updatedPrevNode] : []),
            ...(updatedNextNode.text.length > 0 ? [updatedNextNode] : [])
        ];

        const newChildren: TextNode[] = [
            ...beforeChildren,
            ...middleChildren,
            ...afterChildren
        ];
        if(newChildren.length === 0){
            newChildren.push({
                text: " ",
                marks:{bold: false}
            })
        }
        const newBlock: BlockNode = {
            ...block,
            children: newChildren
       };

        const newDoc: DocumentModle = {
            blocks: doc.blocks.map((b, i) =>
                i === blockIndex ? newBlock : b
            )
        };

        const newCursor: Cursor = {
            blockIndex,
            childIndex: beforeChildren.length,
            offset: updatedPrevNode.text.length
        };

        return { doc: newDoc, cursor: newCursor };
    }
    // across multiple blocks
    else if (startCursor.blockIndex !== endCursor.blockIndex) {
        const startBlock = doc.blocks[startCursor.blockIndex];
        const endBlock = doc.blocks[endCursor.blockIndex];

        const newStartChildren: TextNode[] = [];

        startBlock.children.forEach((child, index) => {
            if (index < startCursor.childIndex) {
                newStartChildren.push(child);
            } else if (index === startCursor.childIndex) {
                const newText = child.text.slice(0, startCursor.offset);
                if (newText.length > 0) {
                    newStartChildren.push({
                        ...child,
                        text: newText
                    });
                }
            }
        });

        endBlock.children.forEach((child, index) => {
            if (index === endCursor.childIndex) {
                const newText = child.text.slice(endCursor.offset);
                if (newText.length > 0) {
                    newStartChildren.push({
                        ...child,
                        text: newText
                    });
                }
            } else if (index > endCursor.childIndex) {
                newStartChildren.push(child);
            }
        });
        
        if (newStartChildren.length === 0) {
            newStartChildren.push({
                text: " ",
                marks: { bold: false }
            });
        }
        const newStartBlock: BlockNode = {
            ...startBlock,
            children: newStartChildren
        };


        const newBlocks: BlockNode[] = [
            ...doc.blocks.slice(0, startCursor.blockIndex),
            newStartBlock,
            ...doc.blocks.slice(endCursor.blockIndex + 1)
        ];

        const newDoc: DocumentModle = {
            blocks: newBlocks
        };

        const lastChildIndex = newStartChildren.length - 1;
        const lastChild = newStartChildren[lastChildIndex];

        const newCursor: Cursor = {
            blockIndex: startCursor.blockIndex,
            childIndex: lastChildIndex,
            offset: lastChild.text.length
        };

        return { doc: newDoc, cursor: newCursor };
    }
   
    return {doc, cursor: startCursor};
}

export const BlogCanvas = ({editorRef,doc,setDoc,cursor,setCursor} : BlogCanvasProps) => {
    
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
            
            
            const sel = window.getSelection();
            if (sel && !sel.isCollapsed){
                const startCursor = getCursorFromDOM(editorRef.current!);
                
                // Temporarily collapse selection to get end
                sel.collapseToEnd();
                const endCursor = getCursorFromDOM(editorRef.current!);
                
                if (!startCursor || !endCursor) return { doc, cursor };
                console.log("Range : ",startCursor , endCursor);
                setDoc(prevDoc =>{
                    const result = deleteSelection(prevDoc,startCursor,endCursor);
                    return result.doc;
                });

                if(e.inputType === 'deleteContentBackward') return;
            }
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
