import { getCursorFromDOM } from "./blogWriteHelpers";
import {myTools,  ToolKitProps } from "./blogWriteTypes";

export const ToolKit = ({
  applyEffect,
  editorRef,
  Toolbuttons,
}: ToolKitProps) => {
  return (
    <div className="mx-5 my-2 p-2 bg-gray-toolkit shadow-sm rounded-full flex justify-center gap-2">
      {myTools.map((tool) => {
        const isActive = Toolbuttons[tool.effect];

        return (
          <button
            key={tool.effect}
            onClick={() => {
              const sel = window.getSelection();
              if (!sel || sel.isCollapsed) return;

              const startCursor = getCursorFromDOM(editorRef.current!);
              sel.collapseToEnd();
              const endCursor = getCursorFromDOM(editorRef.current!);
              if (!startCursor || !endCursor) return;

              applyEffect(tool.effect, startCursor, endCursor);
            }}
            className={`
              px-2 py-1 rounded
              hover:bg-gray-200
              ${tool.className}
              ${isActive ? "bg-gray-300 ring-1 ring-gray-500" : ""}
            `}
          >
            {tool.symbol}
          </button>
        );
      })}
    </div>
  );
};
