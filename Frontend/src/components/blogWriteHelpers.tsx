import {BlockNode,TextNode,Cursor} from "./blogWriteTypes"

export function countLeadingSpaces(text: string) {
  let i = 0;
  while (i < text.length && text[i] === " ") i++;
  return i;
}

export function countTrailingSpaces(text: string) {
  let i = text.length - 1;
  while (i >= 0 && text[i] === " ") i--;
  return text.length - 1 - i;
}


export function splitAndToggleBold(
  child: TextNode,
  startOffset: number,
  endOffset: number
): TextNode[] {
  const { text, marks } = child;

  const beforeText = text.slice(0, startOffset);
  const selectedText = text.slice(startOffset, endOffset);
  const afterText = text.slice(endOffset);

  const baseMarks = { ...marks };
  const toggledMarks = {
    ...marks,
    bold: !marks?.bold,
  };

  const nodes: TextNode[] = [];

  if (beforeText.length > 0) {
    nodes.push({
      text: beforeText,
      marks: baseMarks,
    });
  }

  if (selectedText.length > 0) {
    nodes.push({
      text: selectedText,
      marks: toggledMarks,
    });
  }

  if (afterText.length > 0) {
    nodes.push({
      text: afterText,
      marks: baseMarks,
    });
  }

  return nodes;
}

export function renderTextNode(
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

export function renderBlock(block: BlockNode, blockIndex: number) {
  return (
    <p key={blockIndex}>
      {block.children.map((node, childIndex) =>
        renderTextNode(node, blockIndex, childIndex)
      )}
    </p>
  );
}

export function restoreCaret(
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


export function getCursorFromDOM(
  _root: HTMLElement
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
