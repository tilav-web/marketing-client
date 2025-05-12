"use client";

import type React from "react";

import { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  type Edge,
  MiniMap,
  type Node,
  type Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

import DiagramList from "./diagram-list";
import CustomNode from "./custom-node";
import CustomEdge from "./custom-edge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Plus, Trash2 } from "lucide-react";
import { SubSidebar } from "./sub-sidebar";
import { INode } from "@/interfaces/nodes.interface";
import { IEdge } from "@/interfaces/edges.interface";
import { IDiagram } from "@/interfaces/diagram.interface";
import { toast } from "sonner";
import { diagramService } from "@/services/diagram.service";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { AxiosError } from "axios";
import { nodesService } from "@/services/nodes.service";
import { edgesService } from "@/services/edges.service";
import { useNavigate, useParams } from "react-router-dom";

// Node types definition
const nodeTypes = {
  custom: CustomNode,
};

// Edge types definition
const edgeTypes = {
  custom: CustomEdge,
};

// Initial diagram data
const initialNodes: INode[] = [];

const initialEdges: IEdge[] = [];

function DiagramEditorContent() {
  // State for diagram title
  const [title, setTitle] = useState<string>("Untitled Diagram");

  // State for user's diagrams
  const [userDiagrams, setUserDiagrams] = useState<IDiagram[]>([]);

  // State for loading status
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // State for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes as INode[]
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialEdges as IEdge[]
  );

  // State for selected elements
  const [selectedNode, setSelectedNode] = useState<INode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<IEdge | null>(null);

  const { user } = useSelector((state: RootState) => state.user);

  const { id: diagramId } = useParams();
  const navigate = useNavigate();

  // ReactFlow instance
  // const reactFlowInstance = useReactFlow();

  useEffect(() => {
    (async () => {
      try {
        if (!diagramId) return;

        const fetchedDiagram = await diagramService.getDiagramById(diagramId);

        setTitle(fetchedDiagram.title);
        setSelectedNode(null);
        setSelectedEdge(null);

        const nodes = Array.isArray(fetchedDiagram.nodes)
          ? fetchedDiagram.nodes.map((node: INode) => ({
              ...node,
              id: node.id || node._id,
              type: node.type || "custom",
              position: node.position,
              data: node.data,
            }))
          : [];

        const edges = Array.isArray(fetchedDiagram.edges)
          ? fetchedDiagram.edges.map((edge: IEdge) => ({
              ...edge,
              id: edge.id || edge._id,
              type: edge.type || "custom",
              source: edge.source,
              target: edge.target,
              data: edge.data,
            }))
          : [];

        setNodes(nodes as INode[]);
        setEdges(edges as IEdge[]);

        toast.success("Diagram Loaded", {
          description: `Loaded "${fetchedDiagram.title}"`,
        });
      } catch (error) {
        const err = error as AxiosError;
        toast.error("Error loading diagram", {
          description:
            err.response?.status === 404
              ? "Diagram not found"
              : "Failed to load diagram",
        });
      }
    })();
  }, [diagramId, setEdges, setNodes]);

  // Fetch user's diagrams on component mount
  useEffect(() => {
    const fetchUserDiagrams = async () => {
      try {
        if (!user?._id) {
          toast("Error", { description: "User not authenticated" });
          setIsLoading(false);
          return;
        }
        const data = await diagramService.getUserDiagrams(user._id);
        setUserDiagrams(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching diagrams:", error);
        toast("Error", { description: "Failed to load your diagrams" });
        setIsLoading(false);
      }
    };

    fetchUserDiagrams();
  }, [user?._id]);

  // Handle node selection
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node as INode);
    setSelectedEdge(null);
  }, []);

  // Handle edge selection
  const onEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge as IEdge);
    setSelectedNode(null);
  }, []);

  // Handle background click (deselect all)
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  // Handle edge connections
  const onConnect = useCallback(
    async (connection: Connection) => {
      const newEdge = {
        ...connection,
        id: `e${connection.source}-${connection.target}`,
        type: "custom",
        data: {
          label: "",
          animated: false,
          style: {
            stroke: "#64748b",
            strokeWidth: 2,
          },
        },
      };

      if (!newEdge.source || !newEdge.target || !newEdge.id || !diagramId)
        return;

      const data = await edgesService.createEdges({
        source: newEdge.source,
        target: newEdge.target,
        id: newEdge.id,
        diagram: diagramId,
      });

      setEdges((eds) => addEdge(data, eds));
    },
    [setEdges]
  );

  // Update node data
  const updateNodeData = useCallback(
    (id: string, updatedFields: Partial<INode>) => {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === id
            ? {
                ...node,
                ...updatedFields,
                data: {
                  ...node.data,
                  ...updatedFields.data,
                },
                position: updatedFields.position
                  ? {
                      ...node.position,
                      ...updatedFields.position,
                    }
                  : node.position,
              }
            : node
        )
      );
    },
    []
  );

  // Update edge data
  const updateEdgeData = useCallback(
    (id: string, data: Partial<IEdge>) => {
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id === id) {
            return {
              ...edge,
              data: {
                ...edge.data,
                ...data.data,
                style: {
                  ...edge.data?.style,
                  ...data.data?.style,
                },
              },
            };
          }
          return edge;
        })
      );
    },
    [setEdges]
  );

  // Add a new node
  const addNode = useCallback(async () => {
    const id = `${nodes.length + 1}-${Date.now()}`;
    if (!diagramId) {
      toast.error("No diagram selected", {
        description: "Please create or load a diagram first",
      });
      return;
    }

    const newNode: INode = {
      id,
      diagram: diagramId,
      type: "custom",
      position: {
        x: 250,
        y: 100 + nodes.length * 100,
      },
      data: {
        label: `Node ${nodes.length + 1}`,
        width: 150,
        height: 60,
        backgroundColor: "#f8fafc",
        color: "#0f172a",
        rotate: 0,
      },
    };

    const data: INode = await nodesService.createNodes(newNode);

    setNodes((nds) => [...nds, data]);
  }, [nodes, setNodes]);

  // Delete selected element
  const deleteSelected = useCallback(async () => {
    if (selectedNode && selectedNode._id && diagramId) {
      await nodesService.deleteNodes({
        node: selectedNode._id,
        diagram: diagramId,
      });
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setSelectedNode(null);
    }
    if (selectedEdge && selectedEdge._id && diagramId) {
      await edgesService.deleteEdges({
        edge: selectedEdge._id,
        diagram: diagramId,
      });
      setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdge.id));
      setSelectedEdge(null);
    }
  }, [selectedNode, selectedEdge, setNodes, setEdges]);

  // Create a new diagram
  const createNewDiagram = useCallback(async () => {
    try {
      if (!user?._id) {
        toast.error("Authentication required", {
          description: "Please log in to create a diagram",
        });
        return;
      }
      const newDiagram: IDiagram = await diagramService.createDiagram({
        user: user._id,
        title: "Untitled Diagram",
        nodes: [],
        edges: [],
      });

      setTitle(newDiagram.title);
      setNodes([]);
      setEdges([]);
      setUserDiagrams((prev) => [...prev, newDiagram]);

      toast.success("New Diagram Created", {
        description: "Started a new diagram",
      });
    } catch (error) {
      const err = error as AxiosError;
      toast.error("Error creating diagram", {
        description:
          err.response?.status === 401
            ? "Unauthorized access"
            : "Failed to create diagram",
      });
    }
  }, [user?._id, setNodes, setEdges]);

  // Save the current diagram
  const saveDiagram = useCallback(async () => {
    try {
      if (!user?._id) {
        toast.error("Authentication required", {
          description: "Please log in to save the diagram",
        });
        return;
      }

      setIsLoading(true);

      const diagramData: IDiagram = {
        _id: diagramId,
        title,
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.type ?? "custom",
          position: node.position,
          data: node.data,
          diagram: diagramId ?? "",
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          type: edge.type,
          data: edge.data,
        })),
        user: user._id,
      };

      const savedDiagram = await diagramService.saveDiagram(diagramData);

      setUserDiagrams((prevDiagrams) =>
        diagramId
          ? prevDiagrams.map((d) => (d._id === diagramId ? savedDiagram : d))
          : [...prevDiagrams, savedDiagram]
      );

      setIsLoading(false);
      toast.success("Diagram Saved", {
        description: `"${title}" has been saved successfully`,
      });
    } catch (error) {
      const err = error as AxiosError;
      setIsLoading(false);
      toast.error("Error saving diagram", {
        description:
          err.response?.status === 400
            ? "Invalid diagram data"
            : "Failed to save diagram",
      });
    }
  }, [diagramId, title, nodes, edges, user?._id, userDiagrams]);

  // Delete a diagram
  const deleteDiagram = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);

        await diagramService.deleteDiagram(id);

        setUserDiagrams((prevDiagrams) =>
          prevDiagrams.filter((d) => d._id !== id)
        );

        setIsLoading(false);
        toast("Diagram Deleted", {
          description: "The diagram has been deleted",
        });

        if (id === diagramId) {
          navigate("/sub/diagram");
        }
      } catch (error) {
        console.error("Error deleting diagram:", error);
        setIsLoading(false);
        toast("Error", {
          description: "Failed to delete diagram",
        });
      }
    },
    [createNewDiagram, toast]
  );

  return (
    <div className="w-screen h-screen flex">
      {/* Left sidebar - List of user's diagrams */}
      <DiagramList
        diagrams={userDiagrams}
        onCreateNew={createNewDiagram}
        onDeleteDiagram={deleteDiagram}
        isLoading={isLoading}
      />

      {/* Main diagram area */}
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
        >
          <Background />
          <Controls />
          <MiniMap />

          {/* Top toolbar */}
          <Panel
            position="top-center"
            className="bg-white/80 backdrop-blur-sm p-2 rounded-md shadow-md flex items-center gap-2"
          >
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-64"
              placeholder="Diagram Title"
            />
            <Button
              onClick={saveDiagram}
              size="sm"
              className="flex items-center gap-1"
              disabled={isLoading}
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button
              onClick={addNode}
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Node
            </Button>
            <Button
              onClick={deleteSelected}
              size="sm"
              variant="destructive"
              disabled={!selectedNode && !selectedEdge}
              className="flex items-center gap-1"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </Panel>
        </ReactFlow>
      </div>

      {/* Right sidebar - Properties panel */}
      <SubSidebar
        selectedNode={selectedNode}
        selectedEdge={selectedEdge}
        updateNodeData={updateNodeData}
        updateEdgeData={updateEdgeData}
      />
    </div>
  );
}

// Wrap with ReactFlowProvider to access ReactFlow context
export default function DiagramEditor() {
  return (
    <ReactFlowProvider>
      <DiagramEditorContent />
    </ReactFlowProvider>
  );
}
