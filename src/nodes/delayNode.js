import { useState } from 'react';
import BaseNode from './common/BaseNode';

export const DelayNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);

  const handleDelayChange = (e) => {
    setDelay(Number(e.target.value));
  };

  return (
    <BaseNode
      title="Delay"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
      headerColor="#00BCD4"
      width={200}
    >
      {({ createInput, createLabel }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {createLabel({ children: 'Delay (ms)' })}
          {createInput({
            type: 'number',
            value: delay,
            onChange: handleDelayChange,
            min: 0,
            style: { width: '100%', boxSizing: 'border-box' }
          })}
        </div>
      )}
    </BaseNode>
  );
}; 