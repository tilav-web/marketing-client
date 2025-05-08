"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  ConnectionLineType,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import ShapeNode from "./shape-node";
import ShapeControls from "./shape-controls";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { IDiagram } from "@/interfaces/diagram.interface";
import { IShape } from "@/interfaces/shape.interface";
import { diagramService } from "@/services/diagram.service";
import { shapeService } from "@/services/shape.service";

const nodeTypes: NodeTypes = {
  shape: ShapeNode,
};

interface DiagramEditorProps {
  diagramId: string;
  onDiagramUpdate: (diagram: IDiagram) => void;
}

function DiagramEditorContent({
  diagramId,
  onDiagramUpdate,
}: DiagramEditorProps) {
  const [diagram, setDiagram] = useState<IDiagram | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const reactFlowInstance = useReactFlow();
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load diagram data
  useEffect(() => {
    const loadDiagram = async () => {
      setLoading(true);
      try {
        const data = await diagramService.fetchDiagram(diagramId);
        setDiagram(data);
        const shapes = await shapeService.fetchShapesByDiagramId(diagramId);

        // Convert shapes to nodes
        const diagramNodes = shapes.map((shape: IShape) => ({
          id: shape._id as string,
          type: "shape",
          position: shape.position,
          data: {
            ...shape,
            onChange: handleShapeChange,
          },
        }));

        // Create edges from united shapes
        const diagramEdges: Edge[] = [];
        shapes.forEach((shape: IShape) => {
          if (shape.united && shape.united.length > 0) {
            shape.united.forEach((connection) => {
              diagramEdges.push({
                id: `${shape._id}-${connection.id}`,
                source: shape._id as string,
                target: connection.id,
                sourceHandle: connection.part,
                type: "smoothstep",
              });
            });
          }
        });

        setNodes(diagramNodes);
        setEdges(diagramEdges);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load diagram:", error);
        setLoading(false);
      }
    };

    if (diagramId) {
      loadDiagram();
    }
  }, [diagramId, setNodes, setEdges]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Handle node selection
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Handle background click to deselect
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Handle connection between nodes
  const onConnect = useCallback(
    (connection: Connection) => {
      // Create edge
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: "smoothstep",
          },
          eds
        )
      );

      // Update the united property in the source shape
      if (connection.source && connection.target && connection.sourceHandle) {
        setNodes((nds) => {
          return nds.map((node) => {
            if (node.id === connection.source) {
              const nodeData = node.data;
              const united = nodeData.united || [];

              // Check if connection already exists
              const connectionExists = united.some(
                (u: {
                  id: string;
                  part: "top" | "bottom" | "left" | "right";
                }) =>
                  u.id === connection.target &&
                  u.part === connection.sourceHandle
              );

              if (!connectionExists) {
                return {
                  ...node,
                  data: {
                    ...nodeData,
                    united: [
                      ...united,
                      {
                        id: connection.target,
                        part: connection.sourceHandle,
                      },
                    ],
                  },
                };
              }
            }
            return node;
          });
        });
      }
    },
    [setEdges, setNodes]
  );

  // Handle shape changes
  const handleShapeChange = useCallback(
    async (id: string, updates: Partial<IShape>) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                ...updates,
                onChange: handleShapeChange,
              },
            };
          }
          return node;
        })
      );

      try {
        await shapeService.updateShape(id, updates);
      } catch (error) {
        console.error("Failed to update shape:", error);
      }

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        handleSaveDiagram();
      }, 2000);
    },
    [setNodes]
  );

  // Add a new shape
  const handleAddShape = useCallback(async () => {
    const position = reactFlowInstance.project({
      x: Math.random() * 300 + 50,
      y: Math.random() * 300 + 50,
    });

    const newShape: IShape = {
      content: "New Shape",
      diagram: diagramId,
      size: { width: 120, height: 30 },
      colors: { background: "#4dabf7", text: "#ffffff" },
      position: position,
      united: [],
    };

    try {
      const createdShape = await shapeService.createShape(newShape);

      setNodes((nds) => [
        ...nds,
        {
          id: createdShape._id as string,
          type: "shape",
          position: createdShape.position,
          data: {
            ...createdShape,
            onChange: handleShapeChange,
          },
        },
      ]);
    } catch (error) {
      console.error("Failed to create shape:", error);
    }
  }, [reactFlowInstance, setNodes, handleShapeChange]);

  const onNodesDelete = useCallback(async (deleted: Node[]) => {
    for (const node of deleted) {
      try {
        await shapeService.deleteShape(node.id);
      } catch (error) {
        console.error("Failed to delete shape:", error);
      }
    }
  }, []);

  // Save diagram to server
  const handleSaveDiagram = async () => {
    if (!diagram) return;

    setSaving(true);

    try {
      const shapes: IShape[] = nodes.map((node) => {
        const { onChange, ...shapeData } = node.data;
        console.log(onChange);
        return {
          ...shapeData,
          position: node.position,
        };
      });

      const updatedDiagram: IDiagram = { ...diagram };
      const savedDiagram = await diagramService.updateDiagram(
        diagramId,
        updatedDiagram
      );
      await shapeService.updateMany(shapes);
      setDiagram(savedDiagram);
      onDiagramUpdate(savedDiagram);
      setSaving(false);
    } catch (error) {
      console.error("Failed to save diagram:", error);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Loading diagram...
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button size="sm" variant="outline" onClick={handleAddShape}>
          <Plus className="h-4 w-4 mr-1" />
          Add Shape
        </Button>
        <Button
          size="sm"
          variant="default"
          onClick={handleSaveDiagram}
          disabled={saving}
        >
          <Save className="h-4 w-4 mr-1" />
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        minZoom={0.2}
        maxZoom={4}
        fitView
        attributionPosition="bottom-left"
        className="bg-gray-900"
        onNodesDelete={onNodesDelete}
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

      {selectedNode && (
        <ShapeControls
          node={selectedNode}
          onChange={handleShapeChange}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}

export default function DiagramEditor(props: DiagramEditorProps) {
  return (
    <ReactFlowProvider>
      <DiagramEditorContent {...props} />
    </ReactFlowProvider>
  );
}
