// submit.js

import React, { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { showToast } from './Toast';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    // Validation: Check if at least one node exists
    if (!nodes || nodes.length === 0) {
      showToast('Please add at least one node to the workflow before submitting', 'error');
      return;
    }

    setIsLoading(true);
    
    // Show processing toast
    showToast('Processing pipeline...', 'info');
    
    try {
      // Simulate processing delay and buffering
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Additional buffering simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      showToast('Pipeline is submitted, Next step will be performed by workflow/pipeline manager', 'success');
      
      console.log('Pipeline submitted successfully:', { nodes, edges });
      
    } catch (error) {
      console.error('Error:', error);
      showToast('Failed to submit pipeline. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={isLoading}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '20px',
        padding: '12px 24px',
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
        transition: 'all 0.2s ease',
        zIndex: 1100,
        opacity: isLoading ? 0.7 : 1,
        '@media (max-width: 768px)': {
          bottom: '40px',
          right: '10px',
          padding: '10px 20px',
          fontSize: '13px'
        },
        '@media (max-width: 480px)': {
          bottom: '30px',
          right: '5px',
          padding: '8px 16px',
          fontSize: '12px'
        }
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#1976D2';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(33, 150, 243, 0.4)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#2196F3';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(33, 150, 243, 0.3)';
      }}
    >
      {isLoading ? (
        <>
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid #ffffff',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          Processing...
        </>
      ) : (
        'Submit Pipeline'
      )}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </button>
  );
};
