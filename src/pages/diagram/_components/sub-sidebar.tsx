import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { INode } from "@/interfaces/nodes.interface";
import { IEdge } from "@/interfaces/edges.interface";
import { useEffect, useState } from "react";

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
  const [label, setLabel] = useState<string>(selectedNode?.data?.label || "");
  const [width, setWidth] = useState<number>(selectedNode?.data?.width || 150);
  const [height, setHeight] = useState<number>(
    selectedNode?.data?.height || 60
  );
  const [backgroundColor, setBackgroundColor] = useState<string>(
    selectedNode?.data?.backgroundColor || "#f8fafc"
  );
  const [color, setColor] = useState<string>(
    selectedNode?.data?.color || "#0f172a"
  );
  const [xPosition, setXPosition] = useState<number>(
    selectedNode?.position?.x || 0
  );
  const [yPosition, setYPosition] = useState<number>(
    selectedNode?.position?.y || 0
  );

  const [edgeLabel, setEdgeLabel] = useState<string>(
    selectedEdge?.data?.label || ""
  );
  const [edgeAnimated, setEdgeAnimated] = useState<boolean>(
    selectedEdge?.data?.animated || false
  );
  const [edgeStrokeColor, setEdgeStrokeColor] = useState<string>(
    selectedEdge?.data?.style?.stroke || "#64748b"
  );
  const [edgeStrokeWidth, setEdgeStrokeWidth] = useState<number>(
    selectedEdge?.data?.style?.strokeWidth || 2
  );

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data?.label || "");
      setWidth(selectedNode.data?.width || 150);
      setHeight(selectedNode.data?.height || 60);
      setBackgroundColor(selectedNode.data?.backgroundColor || "#f8fafc");
      setColor(selectedNode.data?.color || "#0f172a");
      setXPosition(selectedNode.position?.x || 0);
      setYPosition(selectedNode.position?.y || 0);
    }
  }, [selectedNode]);

  useEffect(() => {
    if (selectedNode) {
      updateNodeData(selectedNode.id, {
        data: { label, width, height, backgroundColor, color },
        position: { x: xPosition, y: yPosition },
      });
    }
  }, [
    label,
    width,
    height,
    backgroundColor,
    color,
    xPosition,
    yPosition,
    selectedNode,
    updateNodeData,
  ]);

  useEffect(() => {
    if (selectedEdge) {
      setEdgeLabel(selectedEdge.data?.label || "");
      setEdgeAnimated(selectedEdge.data?.animated || false);
      setEdgeStrokeColor(selectedEdge.data?.style?.stroke || "#64748b");
      setEdgeStrokeWidth(selectedEdge.data?.style?.strokeWidth || 2);
    }
  }, [selectedEdge]);

  useEffect(() => {
    if (selectedEdge) {
      updateEdgeData(selectedEdge.id, {
        data: {
          label: edgeLabel,
          animated: edgeAnimated,
          style: { stroke: edgeStrokeColor, strokeWidth: edgeStrokeWidth },
        },
      });
    }
  }, [
    edgeLabel,
    edgeAnimated,
    edgeStrokeColor,
    edgeStrokeWidth,
    selectedEdge,
    updateEdgeData,
  ]);

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
    <div className="w-80 h-full border-l bg-slate-50 p-4 overflow-y-auto space-y-8">
      {selectedNode && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Node Properties</h3>
            <span className="text-xs text-gray-500">ID: {selectedNode.id}</span>
          </div>

          {/* Label */}
          <div className="space-y-2">
            <Label htmlFor="node-label">Label</Label>
            <Input
              id="node-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>

          {/* Width */}
          <div className="space-y-2">
            <Label htmlFor="node-width">Width ({width}px)</Label>
            <Slider
              id="node-width"
              min={100}
              max={300}
              step={10}
              value={[width]}
              onValueChange={(value) => setWidth(value[0])}
            />
          </div>

          {/* Height */}
          <div className="space-y-2">
            <Label htmlFor="node-height">Height ({height}px)</Label>
            <Slider
              id="node-height"
              min={40}
              max={200}
              step={10}
              value={[height]}
              onValueChange={(value) => setHeight(value[0])}
            />
          </div>

          {/* Background Color */}
          <div className="space-y-2">
            <Label htmlFor="node-bg-color">Background Color</Label>
            <div className="flex gap-2">
              <Input
                id="node-bg-color"
                type="color"
                className="w-12 h-8 p-1"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
              <Input
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </div>
          </div>

          {/* Text Color */}
          <div className="space-y-2">
            <Label htmlFor="node-text-color">Text Color</Label>
            <div className="flex gap-2">
              <Input
                id="node-text-color"
                type="color"
                className="w-12 h-8 p-1"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <Input value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
          </div>

          {/* Position */}
          <div className="space-y-2">
            <Label>Position</Label>
            <div className="flex gap-2">
              <div className="flex-1 space-y-1">
                <Label htmlFor="node-pos-x" className="text-xs">
                  X
                </Label>
                <Input
                  id="node-pos-x"
                  type="number"
                  value={xPosition}
                  onChange={(e) => setXPosition(parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="flex-1 space-y-1">
                <Label htmlFor="node-pos-y" className="text-xs">
                  Y
                </Label>
                <Input
                  id="node-pos-y"
                  type="number"
                  value={yPosition}
                  onChange={(e) => setYPosition(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedEdge && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Edge Properties</h3>
            <span className="text-xs text-gray-500">ID: {selectedEdge.id}</span>
          </div>

          {/* Label */}
          <div className="space-y-2">
            <Label htmlFor="edge-label">Label</Label>
            <Input
              id="edge-label"
              value={edgeLabel}
              onChange={(e) => setEdgeLabel(e.target.value)}
            />
          </div>

          {/* Animated */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="edge-animated"
              checked={edgeAnimated}
              onCheckedChange={(checked) => setEdgeAnimated(checked === true)}
            />
            <Label htmlFor="edge-animated">Animated</Label>
          </div>

          {/* Stroke Color */}
          <div className="space-y-2">
            <Label htmlFor="edge-stroke-color">Stroke Color</Label>
            <div className="flex gap-2">
              <Input
                id="edge-stroke-color"
                type="color"
                className="w-12 h-8 p-1"
                value={edgeStrokeColor}
                onChange={(e) => setEdgeStrokeColor(e.target.value)}
              />
              <Input
                value={edgeStrokeColor}
                onChange={(e) => setEdgeStrokeColor(e.target.value)}
              />
            </div>
          </div>

          {/* Stroke Width */}
          <div className="space-y-2">
            <Label htmlFor="edge-stroke-width">
              Stroke Width ({edgeStrokeWidth}px)
            </Label>
            <Slider
              id="edge-stroke-width"
              min={1}
              max={10}
              step={1}
              value={[edgeStrokeWidth]}
              onValueChange={(value) => setEdgeStrokeWidth(value[0])}
            />
          </div>

          {/* Source and Target */}
          <div className="space-y-2">
            <Label>Connection</Label>
            <div className="flex gap-2">
              <div className="flex-1 space-y-1">
                <Label htmlFor="edge-source" className="text-xs">
                  Source
                </Label>
                <Input
                  id="edge-source"
                  type="text"
                  value={selectedEdge?.source || ""}
                  disabled
                />
              </div>
              <div className="flex-1 space-y-1">
                <Label htmlFor="edge-target" className="text-xs">
                  Target
                </Label>
                <Input
                  id="edge-target"
                  type="text"
                  value={selectedEdge?.target || ""}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
