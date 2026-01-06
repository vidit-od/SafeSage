// Cursor / caret inside blog write canvas

export type Cursor = {
    blockIndex: number;
    childIndex: number;
    offset: number;
};

// Data structures for the doc 
export type TextNode = {
    text : string;
    marks : {
        bold : boolean
    }
}

export type BlockNode = {
    type : "paragraph" | "heading";
    children : TextNode[];

}

export type DocumentModle = {
    blocks : BlockNode[];
}

// All styles related 
export interface Tool {
    name : String,
    symbol? : String,
    style? : String,
    effect: Effect,
}
export interface Tools{
    tools : Tool[]
}
export type Effect =
        |"bold"
        | "italic"
        | "underline"
        | "color"
        | "fontSize"
        | "Strike";


// props to pass arguments from parent to child 
export type ToolKitProps = {
  applyEffect: (effect: Effect, startCursor : Cursor, endCursor: Cursor) => void;
  editorRef: React.RefObject<HTMLDivElement>; 
};
export type BlogCanvasProps = {
  editorRef: React.RefObject<HTMLDivElement>;
  doc: DocumentModle,
  setDoc : React.Dispatch<React.SetStateAction<DocumentModle>>,
  cursor: Cursor,
  setCursor: React.Dispatch<React.SetStateAction<Cursor>>
};
