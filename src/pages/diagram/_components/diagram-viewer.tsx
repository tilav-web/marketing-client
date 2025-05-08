"use client";

import { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type NodeTypes,
  ConnectionLineType,
} from "reactflow";
import "reactflow/dist/style.css";
import OrganizationNode from "./organization-node";
import { diagramService } from "@/services/diagram.service";

const nodeTypes: NodeTypes = {
  organization: OrganizationNode,
};

interface DiagramViewerProps {
  diagramId: string;
}

export default function DiagramViewer({ diagramId }: DiagramViewerProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await diagramService.fetchDiagram(diagramId);
        const shapes = data.shapes || [];

        const nodes: Node[] = shapes.map((shape) => ({
          id: shape._id!,
          type: "organization",
          position: shape.position,
          data: {
            content: shape.content,
            size: shape.size,
            colors: shape.colors,
          },
        }));

        const edges: Edge[] = [];
        shapes.forEach((shape) => {
          (shape.united || []).forEach((u) => {
            edges.push({
              id: `e-${shape._id}-${u.id}`,
              source: shape._id!,
              target: u.id,
              type: "smoothstep",
            });
          });
        });

        setNodes(nodes);
        setEdges(edges);
        setLoading(false);
      } catch (err) {
        console.error("Error loading diagram:", {
          diagramId,
          err,
        });
        setLoading(false);
      }
    })();
  }, [diagramId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-white">
        Loading diagram...
      </div>
    );
  }

  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-white">
        Diagram not found
      </div>
    );
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      connectionLineType={ConnectionLineType.SmoothStep}
      defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      minZoom={0.2}
      maxZoom={4}
      fitView
      attributionPosition="bottom-left"
      className="bg-gray-900"
      nodesDraggable={false}
    >
      <Background color="#444" gap={16} size={1} />
      <Controls className="bg-gray-800 text-white border-gray-700" />
      <MiniMap
        nodeStrokeColor={() => "#fff"}
        nodeColor={() => "#4dabf7"}
        maskColor="rgba(0, 0, 0, 0.5)"
        className="bg-gray-800 border-gray-700"
      />
    </ReactFlow>
  );
}
