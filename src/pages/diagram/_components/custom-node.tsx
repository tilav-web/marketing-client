import { NodeData } from "@/interfaces/nodes.interface";
import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";

function CustomNode({ data, isConnectable }: NodeProps<NodeData>) {
  const {
    label = "Node",
    width = 150,
    height = 60,
    backgroundColor = "#f8fafc",
    color = "#0f172a",
    rotate = 0,
  } = data;

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3"
        onConnect={(params) => {
          console.log("handle onConnect", params);
        }}
      />
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor,
          color,
          transform: `rotate(${rotate}deg)`,
        }}
        className="border rounded-md shadow-md flex items-center justify-center p-2 text-center"
      >
        {label}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3"
        onConnect={(params) => {
          console.log("handle onConnect", params);
        }}
      />
    </>
  );
}

export default memo(CustomNode);
