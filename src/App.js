import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { InstructionsModal } from './InstructionsModal';

function App() {
  return (
    <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <InstructionsModal />
      
      <div style={{ flexShrink: 0 }}>
        <PipelineToolbar />
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <PipelineUI />
      </div>
      <SubmitButton />
      
      {/* Simple branding line */}
      <div 
        className="footer-text"
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '20px',
          fontSize: '12px',
          color: '#999',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          zIndex: 1200
        }}>
        Developed by{' '}
        <a 
          href="https://thebytespark.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            color: '#2196F3',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          bytespark
        </a>
      </div>
    </div>
  );
}

export default App;
