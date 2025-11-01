// submit.js

import React, { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error('Failed to parse pipeline');
      }

      const result = await response.json();
      
      // Create a more visually appealing alert
      const alertDiv = document.createElement('div');
      alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        animation: slideIn 0.3s ease-out;
      `;

      const title = document.createElement('h3');
      title.style.cssText = `
        margin: 0 0 8px 0;
        color: #333;
        font-size: 16px;
        font-weight: 600;
      `;
      title.textContent = 'Pipeline Analysis Results';

      const content = document.createElement('div');
      content.style.cssText = `
        color: #666;
        font-size: 14px;
        line-height: 1.5;
      `;
      content.innerHTML = `
        <p>Nodes: ${result.num_nodes}</p>
        <p>Edges: ${result.num_edges}</p>
        <p>Is DAG: <span style="color: ${result.is_dag ? '#4CAF50' : '#f44336'}">${result.is_dag ? 'Yes' : 'No'}</span></p>
      `;

      const closeButton = document.createElement('button');
      closeButton.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        color: #999;
        cursor: pointer;
        padding: 4px;
        font-size: 16px;
        line-height: 1;
      `;
      closeButton.textContent = '×';
      closeButton.onclick = () => {
        alertDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => alertDiv.remove(), 300);
      };

      alertDiv.appendChild(closeButton);
      alertDiv.appendChild(title);
      alertDiv.appendChild(content);

      // Add keyframes for animations
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);

      document.body.appendChild(alertDiv);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        if (alertDiv.parentNode) {
          alertDiv.style.animation = 'slideOut 0.3s ease-out';
          setTimeout(() => alertDiv.remove(), 300);
        }
      }, 5000);

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to parse pipeline. Please try again.');
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
        bottom: '20px',
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
        zIndex: 1000,
        opacity: isLoading ? 0.7 : 1,
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
