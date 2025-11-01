import { useState } from 'react';
import BaseNode from './common/BaseNode';

const OPERATIONS = [
  { value: 'uppercase', label: 'To Uppercase', color: '#2196F3' },
  { value: 'lowercase', label: 'To Lowercase', color: '#4CAF50' },
  { value: 'capitalize', label: 'Capitalize Words', color: '#FF9800' },
  { value: 'count_words', label: 'Count Words', color: '#9C27B0' },
  { value: 'count_chars', label: 'Count Characters', color: '#E91E63' },
  { value: 'trim', label: 'Trim Whitespace', color: '#607D8B' }
];

export const TextProcessingNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'uppercase');
  const [inputText, setInputText] = useState(data?.inputText || '');
  const [result, setResult] = useState('');

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
    processText(inputText, e.target.value);
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);
    processText(newText, operation);
  };

  const processText = (text, op) => {
    let processed = '';
    switch (op) {
      case 'uppercase':
        processed = text.toUpperCase();
        break;
      case 'lowercase':
        processed = text.toLowerCase();
        break;
      case 'capitalize':
        processed = text.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        break;
      case 'count_words':
        processed = text.trim().split(/\s+/).length.toString();
        break;
      case 'count_chars':
        processed = text.length.toString();
        break;
      case 'trim':
        processed = text.trim();
        break;
      default:
        processed = text;
    }
    setResult(processed);
  };

  const getOperationColor = (opValue) => {
    const option = OPERATIONS.find(opt => opt.value === opValue);
    return option ? option.color : '#666';
  };

  return (
    <BaseNode
      title="Text Processing"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
      headerColor="#2196F3"
      width={300}
      id={id}
    >
      {({ createInput, createLabel }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '8px' }}>
          {/* Operation Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {createLabel({ children: 'Operation' })}
            <div style={{ position: 'relative' }}>
              <select
                value={operation}
                onChange={handleOperationChange}
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
                {OPERATIONS.map(option => (
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

          {/* Input Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {createLabel({ children: 'Input Text' })}
            <textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter text to process"
              style={{
                width: '100%',
                minHeight: '80px',
                padding: '8px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '14px',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Result Display */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {createLabel({ children: 'Result' })}
            <div style={{
              padding: '12px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              minHeight: '40px',
              fontSize: '14px',
              color: '#333',
              wordBreak: 'break-word'
            }}>
              {result || 'No result yet'}
            </div>
          </div>

          {/* Operation Indicator */}
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
              backgroundColor: getOperationColor(operation)
            }} />
            <span style={{ fontSize: '12px', color: '#666' }}>
              {OPERATIONS.find(opt => opt.value === operation)?.label || 'Unknown Operation'}
            </span>
          </div>
        </div>
      )}
    </BaseNode>
  );
}; 