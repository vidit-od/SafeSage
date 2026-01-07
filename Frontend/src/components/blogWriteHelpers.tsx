import {DocumentModle,BlockNode,TextNode,Cursor, Effect} from "./blogWriteTypes"

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


export function splitAndapplyEffect(
  effect : Effect,
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
    [effect]: !marks?.[effect],
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


export const EFFECT_RENDER_MAP: Record<
  Effect,
  {
    className?: string;
    style?: (value: any) => React.CSSProperties;
  }
> = {
  bold: {
    className: "font-bold",
  },
  italic: {
    className: "italic",
  },
  underline: {
    className: "underline",
  },
  strike: {
    className: "line-through",
  },
  /*color: {
    style: (value) => ({ color: value }),
  },*/
  fontSize: {
    style: (value) => ({ fontSize: value }),
  },
};

export function renderTextNode(
  node: TextNode,
  blockIndex: number,
  childIndex: number
) {
  const marks = node.marks ?? {};

  const classNames: string[] = [];
  let inlineStyle: React.CSSProperties = {};

  for (const effect in marks) {
    const value = marks[effect as Effect];
    if (value === undefined || value === null || !value) continue;

    const renderer = EFFECT_RENDER_MAP[effect as Effect];
    if (!renderer) continue;

    if (renderer.className) {
      classNames.push(renderer.className);
    }

    if (renderer.style) {
      inlineStyle = {
        ...inlineStyle,
        ...renderer.style(value),
      };
    }
  }

  return (
    <span
      key={childIndex}
      data-block-index={blockIndex}
      data-child-index={childIndex}
      className={classNames.join(" ")}
      style={inlineStyle}
    >
      {node.text}
    </span>
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

export function getCursorFromDOMPosition(
  node: Node,
  offset: number,
  editor: HTMLElement
): Cursor | null {
  if (!(node instanceof Text)) return null;

  const parent = node.parentElement;
  if (!parent) return null;

  const blockIndex = Number(parent.dataset.blockIndex);
  const childIndex = Number(parent.dataset.childIndex);

  if (Number.isNaN(blockIndex) || Number.isNaN(childIndex)) return null;

  return {
    blockIndex,
    childIndex,
    offset,
  };
}



export function getActiveMarksInSelection(
  doc: DocumentModle,
  start: Cursor,
  end: Cursor
): Partial<Record<Effect, boolean>> {
  const activeMarks: Partial<Record<Effect, boolean>> = {};
  let first = true;

  for (let b = start.blockIndex; b <= end.blockIndex; b++) {
    const block = doc.blocks[b];
    if (!block) continue;

    const startChild =
      b === start.blockIndex ? start.childIndex : 0;
    const endChild =
      b === end.blockIndex
        ? end.childIndex
        : block.children.length - 1;

    for (let c = startChild; c <= endChild; c++) {
      const node = block.children[c];
      if (!node) continue;

      const marks = node.marks ?? {};

      if (first) {
        // initialize with first node
        for (const key in marks) {
          activeMarks[key as Effect] = Boolean(marks[key as Effect]);
        }
        first = false;
      } else {
        // intersect marks
        for (const key in activeMarks) {
          if (!marks[key as Effect]) {
            activeMarks[key as Effect] = false;
          }
        }
      }
    }
  }

  return activeMarks;
}
