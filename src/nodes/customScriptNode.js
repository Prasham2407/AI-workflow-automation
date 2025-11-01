import { useState } from 'react';
import BaseNode from './common/BaseNode';

export const CustomScriptNode = ({ id, data }) => {
  const [script, setScript] = useState(data?.script || '// Write your custom JavaScript here\nreturn input;');

  const handleScriptChange = (e) => {
    setScript(e.target.value);
  };

  return (
    <BaseNode
      title="Custom Script"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
      headerColor="#673AB7"
      width={300}
    >
      {({ createInput, createLabel }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {createLabel({ children: 'Script' })}
          {createInput({
            type: 'textarea',
            value: script,
            onChange: handleScriptChange,
            style: {
              width: '100%',
              height: '150px',
              fontFamily: 'monospace',
              boxSizing: 'border-box'
            }
          })}
        </div>
      )}
    </BaseNode>
  );
}; 