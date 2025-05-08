"use client";

import { memo, useState, useEffect, useRef } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { IShape } from "@/interfaces/shape.interface";

interface ShapeNodeData extends IShape {
  onChange: (id: string, updates: Partial<IShape>) => void;
}

function ShapeNode({ id, data, selected }: NodeProps<ShapeNodeData>) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(data.content);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    if (content !== data.content) {
      data.onChange(id, { content });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setEditing(false);
      data.onChange(id, { content });
    }
  };

  // Fokusni boshqarish
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <div
      className={`shadow-md rounded-md text-center flex items-center justify-center ${selected ? "ring-2 ring-white" : ""}`}
      style={{
        backgroundColor: data.colors.background,
        color: data.colors.text,
        width: data.size.width,
        height: data.size.height,
        padding: "8px",
      }}
      onDoubleClick={handleDoubleClick}
    >
      <Handle type="source" position={Position.Top} id="top" className="w-3 h-3 bg-gray-200" />
      <Handle type="source" position={Position.Right} id="right" className="w-3 h-3 bg-gray-200" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="w-3 h-3 bg-gray-200" />
      <Handle type="source" position={Position.Left} id="left" className="w-3 h-3 bg-gray-200" />

      {editing ? (
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-center focus:outline-none"
          ref={inputRef}
        />
      ) : (
        <div className="w-full overflow-hidden text-ellipsis">{data.content}</div>
      )}
    </div>
  );
}

export default memo(ShapeNode);