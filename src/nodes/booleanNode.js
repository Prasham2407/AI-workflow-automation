import { useState } from 'react';
import BaseNode from './common/BaseNode';

export const BooleanNode = ({ id, data }) => {
  const [value, setValue] = useState(data?.value || false);

  const handleValueChange = (e) => {
    setValue(e.target.checked);
  };

  return (
    <BaseNode
      title="Boolean"
      outputs={[{ id: `${id}-output` }]}
      headerColor="#E91E63"
      width={200}
    >
      {({ createInput, createLabel }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '4px',
            backgroundColor: value ? '#fce4ec' : '#f5f5f5',
            borderRadius: '4px',
            transition: 'background-color 0.2s ease'
          }}>
            <input
              type="checkbox"
              checked={value}
              onChange={handleValueChange}
              style={{
                width: '18px',
                height: '18px',
                cursor: 'pointer',
                accentColor: '#E91E63'
              }}
            />
            <label style={{ 
              fontSize: '14px',
              color: value ? '#E91E63' : '#666',
              fontWeight: value ? 'bold' : 'normal',
              cursor: 'pointer',
              userSelect: 'none'
            }}>
              {value ? 'True' : 'False'}
            </label>
          </div>
        </div>
      )}
    </BaseNode>
  );
}; 