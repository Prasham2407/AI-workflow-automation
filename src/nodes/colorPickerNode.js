import { useState } from 'react';
import BaseNode from './common/BaseNode';

export const ColorPickerNode = ({ id, data }) => {
  const [color, setColor] = useState(data?.color || '#000000');
  const [opacity, setOpacity] = useState(data?.opacity || 100);

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleOpacityChange = (e) => {
    setOpacity(e.target.value);
  };

  const getRGBA = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  };

  return (
    <BaseNode
      title="Color Picker"
      outputs={[{ id: `${id}-output` }]}
      headerColor="#7B1FA2"
      width={280}
    >
      {({ createInput, createLabel }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px' }}>
          {/* Color Preview */}
          <div style={{
            height: '80px',
            borderRadius: '8px',
            background: `linear-gradient(45deg, ${getRGBA(color, opacity)} 25%, transparent 25%),
                        linear-gradient(-45deg, ${getRGBA(color, opacity)} 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, ${getRGBA(color, opacity)} 75%),
                        linear-gradient(-45deg, transparent 75%, ${getRGBA(color, opacity)} 75%)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
            border: '1px solid #e0e0e0',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: getRGBA(color, opacity),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {getRGBA(color, opacity)}
            </div>
          </div>

          {/* Color Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                backgroundColor: color,
                border: '1px solid #e0e0e0'
              }} />
              <input
                type="color"
                value={color}
                onChange={handleColorChange}
                style={{
                  flex: 1,
                  height: '32px',
                  padding: '0',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Opacity Control */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
                color: '#666'
              }}>
                <span>Opacity</span>
                <span>{opacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={handleOpacityChange}
                style={{
                  width: '100%',
                  height: '4px',
                  WebkitAppearance: 'none',
                  background: `linear-gradient(to right, ${getRGBA(color, 0)} 0%, ${getRGBA(color, 100)} 100%)`,
                  borderRadius: '2px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
          <div style={{ 
            padding: '8px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <div style={{ fontWeight: '500', marginBottom: '2px' }}>HEX</div>
            <div style={{ fontFamily: 'monospace' }}>{color.toUpperCase()}</div>
          </div>
        </div>
      )}
    </BaseNode>
  );
}; 