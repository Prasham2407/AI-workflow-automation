// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent:'center' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='image' label='Image' />
                <DraggableNode type='colorPicker' label='Color Picker' />
                <DraggableNode type='fileUpload' label='File Upload' />
                <DraggableNode type='boolean' label='Boolean' />
                <DraggableNode type='customScript' label='Custom Script' />
            </div>
        </div>
    );
};
