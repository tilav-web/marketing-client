import type { Node, Edge } from "reactflow";

export interface DiagramData {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
}

// Organization chart similar to the example
const organizationChart: DiagramData = {
  id: "org-chart",
  name: "Organization Chart",
  nodes: [
    {
      id: "1",
      type: "organization",
      data: { label: "CEO" },
      position: { x: 400, y: 0 },
    },
    {
      id: "2",
      type: "organization",
      data: { label: "Deputy Director" },
      position: { x: 400, y: 100 },
    },
    {
      id: "3",
      type: "organization",
      data: { label: "Office of Workplace Solutions" },
      position: { x: 200, y: 200 },
    },
    {
      id: "4",
      type: "organization",
      data: { label: "Office of Public Relations" },
      position: { x: 400, y: 200 },
    },
    {
      id: "5",
      type: "organization",
      data: { label: "Counsel Division" },
      position: { x: 600, y: 200 },
    },
    {
      id: "6",
      type: "organization",
      data: { label: "Cooperation" },
      position: { x: 800, y: 200 },
    },
    {
      id: "7",
      type: "organization",
      data: { label: "Analysis Division" },
      position: { x: 200, y: 300 },
    },
    {
      id: "8",
      type: "organization",
      data: { label: "IT Division" },
      position: { x: 400, y: 300 },
    },
    {
      id: "9",
      type: "organization",
      data: { label: "Management Programs Division" },
      position: { x: 600, y: 300 },
    },
    {
      id: "10",
      type: "organization",
      data: { label: "Regulatory and Enforcement Division" },
      position: { x: 800, y: 300 },
    },
    {
      id: "11",
      type: "organization",
      data: { label: "Office of Global Support" },
      position: { x: 200, y: 400 },
    },
    {
      id: "12",
      type: "organization",
      data: { label: "Database Administration" },
      position: { x: 400, y: 400 },
    },
    {
      id: "13",
      type: "organization",
      data: { label: "Office of Financial Management" },
      position: { x: 600, y: 400 },
    },
    {
      id: "14",
      type: "organization",
      data: { label: "Office of Regulatory Policy" },
      position: { x: 800, y: 400 },
    },
  ],
  edges: [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: false,
      type: "smoothstep",
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      animated: false,
      type: "smoothstep",
    },
    {
      id: "e2-4",
      source: "2",
      target: "4",
      animated: false,
      type: "smoothstep",
    },
    {
      id: "e2-5",
      source: "2",
      target: "5",
      animated: false,
      type: "smoothstep",
    },
    {
      id: "e1-6",
      source: "1",
      target: "6",
      animated: false,
      type: "smoothstep",
      style: { strokeDasharray: "5,5" },
    },
    {
      id: "e3-7",
      source: "3",
      target: "7",
      animated: false,
      type: "smoothstep",
    },
    {
      id: "e4-8",
      source: "4",
      target: "8",
      animated: false,
      type: "smoothstep",
    },
    {
      id: "e5-9",
      source: "5",
      target: "9",
      animated: false,
      type: "smoothstep",
    },
    {
      id: "e6-10",
      source: "6",
      target: "10",
      animated: false,
      type: "smoothstep",
    },
    {
      id: "e7-11",
      source: "7",
      target: "11",
      animated: false,
      type: "smoothstep",
    },
    {
      id: "e8-12",
      source: "8",
      target: "12",
      animated: false,
      type: "smoothstep",
    },
    {
      id: "e9-13",
      source: "9",
      target: "13",
      animated: false,
      type: "smoothstep",
    },
    {
      id: "e10-14",
      source: "10",
      target: "14",
      animated: false,
      type: "smoothstep",
    },
  ],
};

// Simple flowchart example
const flowChart: DiagramData = {
  id: "flow-chart",
  name: "Process Flow",
  nodes: [
    {
      id: "1",
      type: "organization",
      data: { label: "Start" },
      position: { x: 250, y: 0 },
    },
    {
      id: "2",
      type: "organization",
      data: { label: "Process Data" },
      position: { x: 250, y: 100 },
    },
    {
      id: "3",
      type: "organization",
      data: { label: "Decision" },
      position: { x: 250, y: 200 },
    },
    {
      id: "4",
      type: "organization",
      data: { label: "Option A" },
      position: { x: 100, y: 300 },
    },
    {
      id: "5",
      type: "organization",
      data: { label: "Option B" },
      position: { x: 400, y: 300 },
    },
    {
      id: "6",
      type: "organization",
      data: { label: "End" },
      position: { x: 250, y: 400 },
    },
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e2-3", source: "2", target: "3", animated: true },
    { id: "e3-4", source: "3", target: "4", animated: true, label: "Yes" },
    { id: "e3-5", source: "3", target: "5", animated: true, label: "No" },
    { id: "e4-6", source: "4", target: "6", animated: true },
    { id: "e5-6", source: "5", target: "6", animated: true },
  ],
};

// Network diagram example
const networkDiagram: DiagramData = {
  id: "network-diagram",
  name: "Network Diagram",
  nodes: [
    {
      id: "1",
      type: "organization",
      data: { label: "Router" },
      position: { x: 250, y: 50 },
    },
    {
      id: "2",
      type: "organization",
      data: { label: "Switch 1" },
      position: { x: 100, y: 150 },
    },
    {
      id: "3",
      type: "organization",
      data: { label: "Switch 2" },
      position: { x: 400, y: 150 },
    },
    {
      id: "4",
      type: "organization",
      data: { label: "Server 1" },
      position: { x: 50, y: 250 },
    },
    {
      id: "5",
      type: "organization",
      data: { label: "Server 2" },
      position: { x: 150, y: 250 },
    },
    {
      id: "6",
      type: "organization",
      data: { label: "Client 1" },
      position: { x: 350, y: 250 },
    },
    {
      id: "7",
      type: "organization",
      data: { label: "Client 2" },
      position: { x: 450, y: 250 },
    },
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2", animated: false },
    { id: "e1-3", source: "1", target: "3", animated: false },
    { id: "e2-4", source: "2", target: "4", animated: false },
    { id: "e2-5", source: "2", target: "5", animated: false },
    { id: "e3-6", source: "3", target: "6", animated: false },
    { id: "e3-7", source: "3", target: "7", animated: false },
  ],
};

export const diagramData: DiagramData[] = [
  organizationChart,
  flowChart,
  networkDiagram,
];

export function getDiagramById(id: string): DiagramData | undefined {
  return diagramData.find((diagram) => diagram.id === id);
}
