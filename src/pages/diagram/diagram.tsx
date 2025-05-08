"use client";

import { useState, useEffect } from "react";
import DiagramList from "./_components/diagram-list";
import DiagramEditor from "./_components/diagram-editor";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { IDiagram } from "@/interfaces/diagram.interface";
import { diagramService } from "@/services/diagram.service";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export default function Diagram() {
  const [diagrams, setDiagrams] = useState<IDiagram[]>([]);
  const [selectedDiagram, setSelectedDiagram] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?._id;

  useEffect(() => {
    const loadDiagrams = async () => {
      try {
        if (!userId) return;
        const data = await diagramService.fetchDiagrams(userId);
        setDiagrams(data);
        if (data.length > 0) {
          setSelectedDiagram(data[0]._id as string);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load diagrams:", error);
        setLoading(false);
      }
    };

    loadDiagrams();
  }, []);

  const handleCreateDiagram = async () => {
    try {
      const newDiagram = await diagramService.createDiagram({
        name: `New Diagram ${diagrams.length + 1}`,
        shapes: [],
        userId,
      });
      setDiagrams([...diagrams, newDiagram]);
      setSelectedDiagram(newDiagram._id as string);
    } catch (error) {
      console.error("Failed to create diagram:", error);
    }
  };

  const handleDiagramUpdate = (updatedDiagram: IDiagram) => {
    setDiagrams(
      diagrams.map((d) => (d._id === updatedDiagram._id ? updatedDiagram : d))
    );
  };

  return (
    <main className="flex h-screen bg-gray-900">
      <div className="w-64 border-r border-gray-700 bg-gray-800 p-4 overflow-auto flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-white">Diagrams</h1>
          <Button size="sm" variant="outline" onClick={handleCreateDiagram}>
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>

        {loading ? (
          <div className="text-gray-400 text-center py-4">
            Loading diagrams...
          </div>
        ) : diagrams.length === 0 ? (
          <div className="text-gray-400 text-center py-4">
            No diagrams found
          </div>
        ) : (
          <DiagramList
            diagrams={diagrams}
            selectedDiagram={selectedDiagram}
            onSelectDiagram={setSelectedDiagram}
            setDiagrams={setDiagrams} // Yangi prop
          />
        )}
      </div>

      <div className="flex-1 relative">
        {selectedDiagram ? (
          <DiagramEditor
            diagramId={selectedDiagram}
            onDiagramUpdate={handleDiagramUpdate}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            {loading
              ? "Loading..."
              : "Select or create a diagram to get started"}
          </div>
        )}
      </div>
    </main>
  );
}
