// llmNode.js

import BaseNode from './common/BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      title="LLM"
      inputs={[
        { id: `${id}-system` },
        { id: `${id}-prompt` }
      ]}
      outputs={[
        { id: `${id}-response` }
      ]}
      headerColor="#2196F3"
      width={250}
    >
      <div style={{ fontSize: '14px', color: '#666' }}>
        This is a LLM.
      </div>
    </BaseNode>
  );
};
