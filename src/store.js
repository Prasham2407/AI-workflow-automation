// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},  // Initialize nodeIDs object
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    deleteNode: (nodeId) => {
        console.log('Deleting node:', nodeId);
        console.log('Current nodes:', get().nodes);
        
        // Find the node to be deleted
        const nodeToDelete = get().nodes.find(n => n.id === nodeId);
        if (!nodeToDelete) {
            console.error('Node not found:', nodeId);
            return;
        }

        // Remove the node
        const newNodes = get().nodes.filter(n => n.id !== nodeId);
        console.log('Nodes after deletion:', newNodes);
        
        // Remove connected edges
        const newEdges = get().edges.filter(edge => 
            edge.source !== nodeId && edge.target !== nodeId
        );
        console.log('Edges after deletion:', newEdges);

        // Update the store
        set({
            nodes: newNodes,
            edges: newEdges
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
  }));
