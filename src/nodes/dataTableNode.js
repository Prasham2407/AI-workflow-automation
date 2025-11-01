import { useState } from 'react';
import BaseNode from './common/BaseNode';

export const DataTableNode = ({ id, data }) => {
  const [tableData, setTableData] = useState(data?.tableData || [
    ['', ''],
    ['', '']
  ]);

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  const addRow = () => {
    setTableData([...tableData, Array(tableData[0].length).fill('')]);
  };

  const addColumn = () => {
    setTableData(tableData.map(row => [...row, '']));
  };

  return (
    <BaseNode
      title="Data Table"
      outputs={[{ id: `${id}-output` }]}
      headerColor="#009688"
      width={400}
    >
      {({ createInput, createLabel }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} style={{ padding: '4px' }}>
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '4px'
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={addRow}
              style={{
                padding: '4px 8px',
                backgroundColor: '#009688',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add Row
            </button>
            <button
              onClick={addColumn}
              style={{
                padding: '4px 8px',
                backgroundColor: '#009688',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add Column
            </button>
          </div>
        </div>
      )}
    </BaseNode>
  );
}; 