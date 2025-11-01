// Toast.js

import React from 'react';

export const showToast = (message, type = 'success') => {
  // Remove any existing toast
  const existingToast = document.getElementById('custom-toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.id = 'custom-toast';
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    max-width: 400px;
    word-wrap: break-word;
    animation: slideInToast 0.3s ease-out;
    cursor: pointer;
    transition: opacity 0.2s ease;
  `;

  // Add close button
  const closeButton = document.createElement('span');
  closeButton.innerHTML = '&times;';
  closeButton.style.cssText = `
    position: absolute;
    top: 4px;
    right: 8px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    opacity: 0.7;
  `;
  closeButton.onclick = (e) => {
    e.stopPropagation();
    removeToast();
  };

  const messageSpan = document.createElement('span');
  messageSpan.textContent = message;
  messageSpan.style.cssText = `
    display: block;
    padding-right: 20px;
  `;

  toast.appendChild(messageSpan);
  toast.appendChild(closeButton);

  // Add CSS animations if not already added
  if (!document.getElementById('toast-animations')) {
    const style = document.createElement('style');
    style.id = 'toast-animations';
    style.textContent = `
      @keyframes slideInToast {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutToast {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
      #custom-toast:hover {
        opacity: 0.9 !important;
      }
    `;
    document.head.appendChild(style);
  }

  const removeToast = () => {
    if (toast.parentNode) {
      toast.style.animation = 'slideOutToast 0.3s ease-out';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 300);
    }
  };

  // Click to dismiss
  toast.onclick = removeToast;

  document.body.appendChild(toast);

  // Auto-remove after 5 seconds
  setTimeout(removeToast, 5000);

  return toast;
};
