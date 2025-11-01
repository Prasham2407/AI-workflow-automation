import { useState } from 'react';
import BaseNode from './common/BaseNode';

export const TimerNode = ({ id, data }) => {
  const [interval, setInterval] = useState(data?.interval || 1000);
  const [isRunning, setIsRunning] = useState(false);

  const handleIntervalChange = (e) => {
    setInterval(Number(e.target.value));
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <BaseNode
      title="Timer"
      outputs={[{ id: `${id}-output` }]}
      headerColor="#FF9800"
      width={200}
    >
      {({ createInput, createLabel }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {createLabel({ children: 'Interval (ms)' })}
          {createInput({
            type: 'number',
            value: interval,
            onChange: handleIntervalChange,
            min: 100,
            style: { width: '100%', boxSizing: 'border-box' }
          })}

          <button
            onClick={toggleTimer}
            style={{
              padding: '4px 8px',
              backgroundColor: isRunning ? '#f44336' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
        </div>
      )}
    </BaseNode>
  );
}; 