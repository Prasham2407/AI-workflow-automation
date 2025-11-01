// InstructionsModal.js

import React, { useState, useEffect } from 'react';

export const InstructionsModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen the instructions
    const hasSeenInstructions = localStorage.getItem('hasSeenInstructions');
    if (!hasSeenInstructions) {
      setIsVisible(true);
    }
  }, []);

  const handleGotIt = () => {
    // Save preference to localStorage
    localStorage.setItem('hasSeenInstructions', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        position: 'relative'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{
            margin: '0 0 16px 0',
            color: '#333',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Welcome to AI Workflow Builder
          </h2>
          <div style={{
            width: '60px',
            height: '4px',
            backgroundColor: '#2196F3',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </div>

        <div style={{
          color: '#666',
          lineHeight: '1.6',
          fontSize: '16px'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              color: '#333',
              fontSize: '18px',
              marginBottom: '12px',
              fontWeight: '500'
            }}>
              Getting Started:
            </h3>
            <ul style={{
              paddingLeft: '20px',
              margin: 0
            }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Drag & Drop:</strong> Use the toolbar on the left to drag nodes onto the canvas
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Connect Nodes:</strong> Click and drag from output handles to input handles to create connections
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Configure:</strong> Click on nodes to configure their settings and parameters
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Submit:</strong> Use the "Submit Pipeline" button to process your workflow
              </li>
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              color: '#333',
              fontSize: '18px',
              marginBottom: '12px',
              fontWeight: '500'
            }}>
              Tips:
            </h3>
            <ul style={{
              paddingLeft: '20px',
              margin: 0
            }}>
              <li style={{ marginBottom: '8px' }}>Use the mini-map in the bottom right to navigate large workflows</li>
              <li style={{ marginBottom: '8px' }}>Press Ctrl+Z to undo and Ctrl+Y to redo</li>
              <li style={{ marginBottom: '8px' }}>Zoom in/out using your mouse wheel</li>
            </ul>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '32px'
        }}>
          <button
            onClick={handleGotIt}
            style={{
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 32px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)'
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
            I Got It!
          </button>
        </div>
      </div>
    </div>
  );
};
