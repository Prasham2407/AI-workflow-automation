// textNode.js

import { useState, useEffect, useRef } from 'react';
import BaseNode from './common/BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [inputHandles, setInputHandles] = useState([]);
  const textareaRef = useRef(null);

  // Function to extract variables from text
  const extractVariables = (text) => {
    const variableRegex = /{{\s*([\w\d_]+)\s*}}/g;
    const matches = [...text.matchAll(variableRegex)];
    return [...new Set(matches.map(match => match[1]))];
  };

  // Update input handles when text changes
  useEffect(() => {
    const variables = extractVariables(currText);
    const newHandles = variables.map(variable => ({
      id: `${id}-${variable}`,
      label: variable
    }));
    setInputHandles(newHandles);
  }, [currText, id]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      title="Text"
      inputs={inputHandles}
      outputs={[{ id: `${id}-output` }]}
      headerColor="#D6D912"
      width={300}
    >
      {({ createInput, createLabel }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {createLabel({ children: 'Text' })}
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            style={{
              width: '100%',
              minHeight: '60px',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              resize: 'vertical',
              fontFamily: 'monospace',
              boxSizing: 'border-box'
            }}
            placeholder="Enter text with {{variables}}"
          />
        </div>
      )}
    </BaseNode>
  );
};
