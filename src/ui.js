// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { ImageNode } from './nodes/imageNode';
import { ColorPickerNode } from './nodes/colorPickerNode';
import { FileUploadNode } from './nodes/fileUploadNode';
import { BooleanNode } from './nodes/booleanNode';
import { CustomScriptNode } from './nodes/customScriptNode';
// import { ChartNode } from './nodes/chartNode';
// import { DataTableNode } from './nodes/dataTableNode';
// import { TimerNode } from './nodes/timerNode';
import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  image: ImageNode,
  colorPicker: ColorPickerNode,
  output: OutputNode,
  fileUpload: FileUploadNode,
  boolean: BooleanNode,
  customScript: CustomScriptNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  deleteNode: state.deleteNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      deleteNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      return {
        id: nodeID,
        nodeType: type,
        // Add any other initial data properties here
      };
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            console.log('Creating new node:', newNode);
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} style={{
            width: '100%', 
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
        }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                style={{ width: '100%', height: '100%' }}
            >
                <Background color="#aaa" gap={gridSize} />
                <Controls 
                    position="bottom-left"
                    style={{
                        zIndex: 900
                    }}
                />
                <MiniMap 
                    position="bottom-right"
                    style={{
                        zIndex: 1000
                    }}
                    nodeStrokeWidth={3}
                    nodeColor="#2196F3"
                />
            </ReactFlow>
        </div>
    )
}
