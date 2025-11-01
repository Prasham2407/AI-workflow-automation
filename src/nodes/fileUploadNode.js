import { useState, useCallback } from 'react';
import BaseNode from './common/BaseNode';

export const FileUploadNode = ({ id, data }) => {
  const [file, setFile] = useState(data?.file || null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  }, []);

  const getFileIcon = (file) => {
    if (!file) return '📄';
    const type = file.type.split('/')[0];
    switch (type) {
      case 'image': return '🖼️';
      case 'video': return '🎥';
      case 'audio': return '🎵';
      case 'text': return '📝';
      case 'application': return '📦';
      default: return '📄';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <BaseNode
      title="File Upload"
      outputs={[{ id: `${id}-output` }]}
      headerColor="#FF9800"
      width={300}
    >
      {({ createInput, createLabel }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${isDragging ? '#FF9800' : '#e0e0e0'}`,
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              backgroundColor: isDragging ? '#fff3e0' : '#fafafa',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={() => document.getElementById('file-input').click()}
          >
            <input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            
            {!file ? (
              <div style={{ color: '#666' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📁</div>
                <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                  Drag and drop a file here
                </div>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  or click to browse
                </div>
              </div>
            ) : (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ fontSize: '32px' }}>{getFileIcon(file)}</div>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '500',
                  color: '#333',
                  wordBreak: 'break-all',
                  textAlign: 'center'
                }}>
                  {file.name}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#666',
                  backgroundColor: '#f5f5f5',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>
                  {formatFileSize(file.size)}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  style={{
                    marginTop: '8px',
                    padding: '6px 12px',
                    backgroundColor: '#ffebee',
                    color: '#f44336',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffcdd2';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffebee';
                  }}
                >
                  Remove File
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </BaseNode>
  );
}; 