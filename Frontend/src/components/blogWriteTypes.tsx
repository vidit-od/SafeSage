// Cursor / caret inside blog write canvas

import React from "react";

export type Cursor = {
    blockIndex: number;
    childIndex: number;
    offset: number;
};

export type Marks = Partial<ToolButtons>;

export interface TextNode {
  text: string;
  marks: Marks;
}

export type BlockNode = {
    type : "paragraph" | "heading";
    children : TextNode[];

}

export type DocumentModle = {
    blocks : BlockNode[];
}

// All styles related 
export const EFFECTS = {
  bold: {
    label: "Bold",
    symbol: "B",
    value : "toggle",
    className: "font-bold",
  },
  italic: {
    label: "Italic",
    symbol: "I",
    value : "toggle",
    className: "italic",
  },
  underline: {
    label: "Underline",
    symbol: "U",
    value : "toggle",
    className: "underline",
  },
  strike: {
    label: "Strike",
    symbol: "S",
    value : "toggle",
    className: "line-through",
  },
  fontSize:{
    label : "FontSize",
    symbol: "F",
    value : "number",
    className : "fontsize"
  }
} as const;

export interface Tool {
    name : String,
    symbol? : String,
    style? : String,
    effect: Effect,
}

export interface Tools{
    tools : Tool[]
}


type EffectConfig = typeof EFFECTS;

export type Effect = keyof EffectConfig;

export type EffectValue<E extends Effect> =
  EffectConfig[E]["value"] extends "toggle"
    ? boolean
    : number;


export type ToolButtons = {
  [E in Effect]: EffectValue<E>;
};

export const myTools = Object.entries(EFFECTS).map(
  ([effect, config]) => ({
    effect: effect as Effect,
    ...config,
  })
);

// props to pass arguments from parent to child 
export type ToolKitProps = {
  applyEffect: (effect: Effect, startCursor : Cursor, endCursor: Cursor) => void;
  editorRef: React.RefObject<HTMLDivElement>; 
  Toolbuttons : ToolButtons,
  setToolButtons : React.Dispatch<React.SetStateAction<ToolButtons>>
};
export type BlogCanvasProps = {
  editorRef: React.RefObject<HTMLDivElement>;
  doc: DocumentModle,
  setDoc : React.Dispatch<React.SetStateAction<DocumentModle>>,
  cursor: Cursor,
  setCursor: React.Dispatch<React.SetStateAction<Cursor>>,
  setToolButtons : React.Dispatch<React.SetStateAction<ToolButtons>>
};
