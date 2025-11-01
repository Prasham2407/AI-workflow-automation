import { useState } from 'react';
import BaseNode from './common/BaseNode';

export const ImageNode = ({ id, data }) => {
  const [imageUrl, setImageUrl] = useState(data?.imageUrl || '');
  const [width, setWidth] = useState(data?.width || 200);
  const [height, setHeight] = useState(data?.height || 200);

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWidthChange = (e) => {
    setWidth(Number(e.target.value));
  };

  const handleHeightChange = (e) => {
    setHeight(Number(e.target.value));
  };

  return (
    <BaseNode
      title="Image"
      outputs={[{ id: `${id}-output` }]}
      headerColor="#607D8B"
      width={300}
    >
      {({ createInput, createLabel }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {createLabel({ children: 'Image URL' })}
          {createInput({
            type: 'text',
            value: imageUrl,
            onChange: handleImageUrlChange,
            style: { width: '100%', boxSizing: 'border-box' }
          })}

          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ flex: 1 }}>
              {createLabel({ children: 'Width' })}
              {createInput({
                type: 'number',
                value: width,
                onChange: handleWidthChange,
                style: { width: '100%', boxSizing: 'border-box' }
              })}
            </div>
            <div style={{ flex: 1 }}>
              {createLabel({ children: 'Height' })}
              {createInput({
                type: 'number',
                value: height,
                onChange: handleHeightChange,
                style: { width: '100%', boxSizing: 'border-box' }
              })}
            </div>
          </div>

          {imageUrl && (
            <div style={{ marginTop: '8px' }}>
              <img
                src={imageUrl}
                alt="Preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '200px',
                  objectFit: 'contain'
                }}
              />
            </div>
          )}
        </div>
      )}
    </BaseNode>
  );
}; 