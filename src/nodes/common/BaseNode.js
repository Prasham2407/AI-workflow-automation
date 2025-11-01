import React from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../../store';

// Common input styles
const commonInputStyles = {
  width: '100%',
  padding: '6px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
  boxSizing: 'border-box',
  maxWidth: '100%',
};

// Common select styles
const commonSelectStyles = {
  ...commonInputStyles,
  backgroundColor: 'white',
};

// Common label styles
const commonLabelStyles = {
  fontSize: '14px',
  color: '#666',
  marginBottom: '4px',
  display: 'block',
};

const BaseNode = ({
  title,
  children,
  inputs = [],
  outputs = [],
  width = 250,
  height = 'auto',
  style = {},
  headerColor = '#2196F3',
  headerStyleProps = {},
  id,
  data
}) => {
  const deleteNode = useStore((state) => state.deleteNode);
  
  // Get node ID from either props or data
  const nodeId = id || data?.id;
  
  console.log('BaseNode rendered with ID:', nodeId);

  const handleDelete = () => {
    console.log('Delete button clicked for node:', nodeId);
    if (window.confirm('Are you sure you want to delete this node?')) {
      console.log('Attempting to delete node:', nodeId);
      try {
        deleteNode(nodeId);
        console.log('Node deleted successfully:', nodeId);
      } catch (error) {
        console.error('Error deleting node:', error);
      }
    }
  };

  const nodeStyle = {
    width,
    minHeight: height,
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
    ...style,
  };

  const headerStyle = {
    padding: '8px 12px',
    backgroundColor: headerColor,
    borderBottom: '1px solid #ccc',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    ...headerStyleProps,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const titleStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
  };

  const contentStyle = {
    padding: '12px',
    boxSizing: 'border-box',
  };

  // Helper function to create a styled input
  const createInput = (props) => (
    <input
      {...props}
      style={{ 
        ...commonInputStyles, 
        ...props.style,
        width: '100%',
        boxSizing: 'border-box',
      }}
    />
  );

  // Helper function to create a styled select
  const createSelect = (props) => (
    <select
      {...props}
      style={{ 
        ...commonSelectStyles, 
        ...props.style,
        width: '100%',
        boxSizing: 'border-box',
      }}
    />
  );

  // Helper function to create a styled label
  const createLabel = (props) => (
    <label
      {...props}
      style={{ 
        ...commonLabelStyles, 
        ...props.style,
        width: '100%',
        boxSizing: 'border-box',
      }}
    />
  );

  return (
    <div style={nodeStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>{title}</h3>
        <button
          onClick={handleDelete}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '4px',
            fontSize: '16px',
            opacity: 0.8,
            transition: 'opacity 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
        >
          ×
        </button>
      </div>
      <div style={contentStyle}>
        {typeof children === 'function' 
          ? children({ createInput, createSelect, createLabel })
          : children}
      </div>
      
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={input.id || `input-${index}`}
          style={{ 
            top: `${((index + 1) * 100) / (inputs.length + 1)}%`,
            background: '#555',
            width: '8px',
            height: '8px',
            ...input.style
          }}
        />
      ))}

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={output.id || `output-${index}`}
          style={{ 
            top: `${((index + 1) * 100) / (outputs.length + 1)}%`,
            background: '#555',
            width: '8px',
            height: '8px',
            ...output.style
          }}
        />
      ))}
    </div>
  );
};

export default BaseNode; 