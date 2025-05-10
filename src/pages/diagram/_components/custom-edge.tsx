import { IEdge } from "@/interfaces/edges.interface";
import { memo } from "react";
import { type EdgeProps, getBezierPath } from "reactflow";

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style = {},
  markerEnd,
}: EdgeProps<IEdge>) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const edgeStyle = {
    stroke: data?.data?.style?.stroke || "#64748b",
    strokeWidth: data?.data?.style?.strokeWidth || 2,
    ...style,
  };

  return (
    <>
      <path
        id={id}
        style={edgeStyle}
        className={`react-flow__edge-path ${
          data?.data?.animated ? "animate-dash" : ""
        }`}
        d={edgePath}
        markerEnd={markerEnd}
      />
      {data?.data?.label && (
        <text>
          <textPath
            href={`#${id}`}
            style={{ fill: edgeStyle.stroke }}
            startOffset="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs"
          >
            {data.data?.label}
          </textPath>
        </text>
      )}
    </>
  );
}

export default memo(CustomEdge);
