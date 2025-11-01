// inputNode.js

import { useState } from 'react';
import BaseNode from './common/BaseNode';

const TYPE_OPTIONS = [
  { value: 'string', label: 'String', color: '#4CAF50' },
  { value: 'number', label: 'Number', color: '#2196F3' },
  { value: 'boolean', label: 'Boolean', color: '#E91E63' },
  { value: 'array', label: 'Array', color: '#9C27B0' },
  { value: 'object', label: 'Object', color: '#FF9800' },
  { value: 'date', label: 'Date', color: '#607D8B' },
  { value: 'file', label: 'File', color: '#795548' },
  { value: 'image', label: 'Image', color: '#00BCD4' },
  { value: 'json', label: 'JSON', color: '#673AB7' }
];

export const InputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.name || '');
  const [type, setType] = useState(data?.type || 'string');
  const [value, setValue] = useState(data?.value || '');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    // Reset value when type changes
    setValue('');
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const getInputType = () => {
    switch (type) {
      case 'number':
        return 'number';
      case 'boolean':
        return 'checkbox';
      case 'date':
        return 'date';
      default:
        return 'text';
    }
  };

  const getTypeColor = (typeValue) => {
    const option = TYPE_OPTIONS.find(opt => opt.value === typeValue);
    return option ? option.color : '#666';
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      outputs={[{ id: `${id}-output` }]}
      headerColor="#4CAF50"
      width={280}
    >
      {({ createInput, createLabel }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '8px' }}>
          {/* Name Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {createLabel({ children: 'Name' })}
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter input name"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Type Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {createLabel({ children: 'Type' })}
            <div style={{ position: 'relative' }}>
              <select
                value={type}
                onChange={handleTypeChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  appearance: 'none',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                {TYPE_OPTIONS.map(option => (
                  <option 
                    key={option.value} 
                    value={option.value}
                    style={{ color: option.color }}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <div style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '0',
                height: '0',
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '5px solid #666',
                pointerEvents: 'none'
              }} />
            </div>
          </div>

          {/* Value Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {createLabel({ children: 'Value' })}
            {type === 'boolean' ? (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '8px',
                backgroundColor: value ? '#e8f5e9' : '#f5f5f5',
                borderRadius: '4px',
                transition: 'background-color 0.2s ease'
              }}>
                <input
                  type="checkbox"
                  checked={value === 'true'}
                  onChange={(e) => setValue(e.target.checked.toString())}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#4CAF50'
                  }}
                />
                <span style={{ 
                  color: value === 'true' ? '#4CAF50' : '#666',
                  fontWeight: value === 'true' ? 'bold' : 'normal'
                }}>
                  {value === 'true' ? 'True' : 'False'}
                </span>
              </div>
            ) : (
              <input
                type={getInputType()}
                value={value}
                onChange={handleValueChange}
                placeholder={`Enter ${type} value`}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            )}
          </div>

          {/* Type Indicator */}
          <div style={{
            padding: '8px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: getTypeColor(type)
            }} />
            <span style={{ fontSize: '12px', color: '#666' }}>
              {TYPE_OPTIONS.find(opt => opt.value === type)?.label || 'Unknown Type'}
            </span>
          </div>
        </div>
      )}
    </BaseNode>
  );
};
