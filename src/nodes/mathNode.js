import { useState } from 'react';
import BaseNode from './common/BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');
  const [value, setValue] = useState(data?.value || 0);

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(Number(e.target.value));
  };

  return (
    <BaseNode
      title="Math Operation"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
      headerColor="#795548"
      width={250}
    >
      {({ createInput, createLabel, createSelect }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {createLabel({ children: 'Operation' })}
          {createSelect({
            value: operation,
            onChange: handleOperationChange,
            style: { width: '100%', boxSizing: 'border-box' }
          })}

          {createLabel({ children: 'Value' })}
          {createInput({
            type: 'number',
            value: value,
            onChange: handleValueChange,
            style: { width: '100%', boxSizing: 'border-box' }
          })}
        </div>
      )}
    </BaseNode>
  );
}; 