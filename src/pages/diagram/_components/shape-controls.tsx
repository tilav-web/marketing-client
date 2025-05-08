"use client";

import { useState, useEffect } from "react";
import type { Node } from "reactflow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { IShape } from "@/interfaces/shape.interface";

interface ShapeControlsProps {
  node: Node;
  onChange: (id: string, updates: Partial<IShape>) => void;
  onClose: () => void;
}

export default function ShapeControls({ node, onChange, onClose }: ShapeControlsProps) {
  const [content, setContent] = useState(node.data.content);
  const [width, setWidth] = useState(node.data.size.width);
  const [height, setHeight] = useState(node.data.size.height);
  const [bgColor, setBgColor] = useState(node.data.colors.background);
  const [textColor, setTextColor] = useState(node.data.colors.text);

  // Sinxronlashtirish
  useEffect(() => {
    setContent(node.data.content);
    setWidth(node.data.size.width);
    setHeight(node.data.size.height);
    setBgColor(node.data.colors.background);
    setTextColor(node.data.colors.text);
  }, [node]);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onChange(node.id, { content: newContent });
  };

  const handleWidthChange = (value: number[]) => {
    const newWidth = value[0];
    setWidth(newWidth);
    onChange(node.id, {
      size: {
        width: newWidth,
        height: node.data.size.height,
      },
    });
  };

  const handleHeightChange = (value: number[]) => {
    const newHeight = value[0];
    setHeight(newHeight);
    onChange(node.id, {
      size: {
        width: node.data.size.width,
        height: newHeight,
      },
    });
  };

  const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBgColor = e.target.value;
    setBgColor(newBgColor);
    onChange(node.id, {
      colors: {
        background: newBgColor,
        text: node.data.colors.text,
      },
    });
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTextColor = e.target.value;
    setTextColor(newTextColor);
    onChange(node.id, {
      colors: {
        background: node.data.colors.background,
        text: newTextColor,
      },
    });
  };

  return (
    <div className="absolute bottom-0 right-0 w-64 bg-gray-800 border border-gray-700 rounded-tl-md p-4 z-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-medium">Shape Properties</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="content" className="text-white">
            Content
          </Label>
          <Input
            id="content"
            value={content}
            onChange={handleContentChange}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Width: {width}px</Label>
          <Slider value={[width]} min={50} max={400} step={1} onValueChange={handleWidthChange} />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Height: {height}px</Label>
          <Slider value={[height]} min={30} max={200} step={1} onValueChange={handleHeightChange} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label htmlFor="bgColor" className="text-white">
              Background
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="bgColor"
                type="color"
                value={bgColor}
                onChange={handleBgColorChange}
                className="w-10 h-10 p-1 bg-gray-700 border-gray-600"
              />
              <Input
                value={bgColor}
                onChange={handleBgColorChange}
                className="bg-gray-700 border-gray-600 text-white text-xs"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="textColor" className="text-white">
              Text
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="textColor"
                type="color"
                value={textColor}
                onChange={handleTextColorChange}
                className="w-10 h-10 p-1 bg-gray-700 border-gray-600"
              />
              <Input
                value={textColor}
                onChange={handleTextColorChange}
                className="bg-gray-700 border-gray-600 text-white text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}