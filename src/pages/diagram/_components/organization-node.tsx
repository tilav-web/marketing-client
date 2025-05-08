import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";

interface OrganizationNodeData {
  content: string;
  size: { width: number; height: number };
  colors: { background: string; text: string };
}

function OrganizationNode({ data }: NodeProps<OrganizationNodeData>) {
  return (
    <div
      className="px-4 py-2 shadow-md rounded-md text-center flex items-center justify-center"
      style={{
        backgroundColor: data.colors.background,
        color: data.colors.text,
        width: data.size.width,
        height: data.size.height,
      }}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="font-bold text-sm">{data.content}</div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
}

export default memo(OrganizationNode);