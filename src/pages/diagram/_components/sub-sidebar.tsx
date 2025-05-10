import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { INode } from "@/interfaces/nodes.interface";
import { IEdge } from "@/interfaces/edges.interface";

interface SidebarProps {
  selectedNode: INode | null;
  selectedEdge: IEdge | null;
  updateNodeData: (id: string, data: Partial<INode>) => void;
  updateEdgeData: (id: string, data: Partial<IEdge>) => void;
}

export function SubSidebar({
  selectedNode,
  selectedEdge,
  updateNodeData,
  updateEdgeData,
}: SidebarProps) {
  if (!selectedNode && !selectedEdge) {
    return (
      <div className="w-80 h-full border-l bg-slate-50 p-4 overflow-y-auto">
        <div className="text-center text-slate-500 mt-8">
          <p>Select a node or edge to edit its properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 h-full border-l bg-slate-50 p-4 overflow-y-auto">
      {selectedNode && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Node Properties</h3>
            <div className="text-xs text-slate-500">ID: {selectedNode.id}</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="node-label">Label</Label>
            <Input
              id="node-label"
              value={selectedNode.data?.label || ""}
              onChange={(e) =>
                updateNodeData(selectedNode.id, {
                  data: { label: e.target.value },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="node-width">
              Width ({selectedNode.data?.width}px)
            </Label>
            <Slider
              id="node-width"
              min={100}
              max={300}
              step={10}
              value={[selectedNode.data?.width || 150]}
              onValueChange={(value) =>
                updateNodeData(selectedNode.id, { data: { width: value[0] } })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="node-height">
              Height ({selectedNode.data?.height}px)
            </Label>
            <Slider
              id="node-height"
              min={40}
              max={200}
              step={10}
              value={[selectedNode.data?.height || 60]}
              onValueChange={(value) =>
                updateNodeData(selectedNode.id, { data: { height: value[0] } })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="node-bg-color">Background Color</Label>
            <div className="flex gap-2">
              <Input
                id="node-bg-color"
                type="color"
                value={selectedNode.data?.backgroundColor || "#f8fafc"}
                onChange={(e) =>
                  updateNodeData(selectedNode.id, {
                    data: { backgroundColor: e.target.value },
                  })
                }
                className="w-12 h-8 p-1"
              />
              <Input
                value={selectedNode.data?.backgroundColor || "#f8fafc"}
                onChange={(e) =>
                  updateNodeData(selectedNode.id, {
                    data: { backgroundColor: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="node-text-color">Text Color</Label>
            <div className="flex gap-2">
              <Input
                id="node-text-color"
                type="color"
                value={selectedNode.data?.color || "#0f172a"}
                onChange={(e) =>
                  updateNodeData(selectedNode.id, {
                    data: { color: e.target.value },
                  })
                }
                className="w-12 h-8 p-1"
              />
              <Input
                value={selectedNode.data?.color || "#0f172a"}
                onChange={(e) =>
                  updateNodeData(selectedNode.id, {
                    data: { color: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Position</Label>
            <div className="flex gap-2">
              <div className="space-y-1 flex-1">
                <Label htmlFor="node-pos-x" className="text-xs">
                  X
                </Label>
                <Input
                  id="node-pos-x"
                  type="number"
                  value={selectedNode.position.x}
                  onChange={(e) => {
                    const newNode = { ...selectedNode };
                    newNode.position.x = Number.parseInt(e.target.value) || 0;
                    updateNodeData(selectedNode.id, newNode);
                  }}
                />
              </div>
              <div className="space-y-1 flex-1">
                <Label htmlFor="node-pos-y" className="text-xs">
                  Y
                </Label>
                <Input
                  id="node-pos-y"
                  type="number"
                  value={selectedNode.position.y}
                  onChange={(e) => {
                    const newNode = { ...selectedNode };
                    newNode.position.y = Number.parseInt(e.target.value) || 0;
                    updateNodeData(selectedNode.id, { ...newNode });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedEdge && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Edge Properties</h3>
            <div className="text-xs text-slate-500">ID: {selectedEdge.id}</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edge-label">Label</Label>
            <Input
              id="edge-label"
              value={selectedEdge.data?.label || ""}
              onChange={(e) =>
                updateEdgeData(selectedEdge.id, {
                  data: { label: e.target.value },
                })
              }
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="edge-animated"
              checked={selectedEdge.data?.animated || false}
              onCheckedChange={(checked) =>
                updateEdgeData(selectedEdge.id, {
                  data: { animated: checked === true },
                })
              }
            />
            <Label htmlFor="edge-animated">Animated</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edge-stroke-color">Stroke Color</Label>
            <div className="flex gap-2">
              <Input
                id="edge-stroke-color"
                type="color"
                value={selectedEdge.data?.style?.stroke || "#64748b"}
                onChange={(e) =>
                  updateEdgeData(selectedEdge.id, {
                    data: { style: { stroke: e.target.value } },
                  })
                }
                className="w-12 h-8 p-1"
              />
              <Input
                value={selectedEdge.data?.style?.stroke || "#64748b"}
                onChange={(e) =>
                  updateEdgeData(selectedEdge.id, {
                    data: { style: { stroke: e.target.value } },
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edge-stroke-width">
              Stroke Width ({selectedEdge.data?.style?.strokeWidth || 2}
              px)
            </Label>
            <Slider
              id="edge-stroke-width"
              min={1}
              max={10}
              step={1}
              value={[selectedEdge.data?.style?.strokeWidth || 2]}
              onValueChange={(value) =>
                updateEdgeData(selectedEdge.id, {
                  data: { style: { strokeWidth: value[0] } },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Connection</Label>
            <div className="flex gap-2">
              <div className="space-y-1 flex-1">
                <Label htmlFor="edge-source" className="text-xs">
                  Source
                </Label>
                <Input id="edge-source" value={selectedEdge.source} disabled />
              </div>
              <div className="space-y-1 flex-1">
                <Label htmlFor="edge-target" className="text-xs">
                  Target
                </Label>
                <Input id="edge-target" value={selectedEdge.target} disabled />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
