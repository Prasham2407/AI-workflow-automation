from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    type: str

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(edges: List[Edge]) -> bool:
    # Create adjacency list
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Build graph and calculate in-degrees
    for edge in edges:
        graph[edge.source].append(edge.target)
        in_degree[edge.target] += 1
    
    # Find all nodes with no incoming edges
    queue = [node for node in graph if in_degree[node] == 0]
    
    # If no nodes have zero in-degree, there must be a cycle
    if not queue:
        return False
    
    # Process nodes in topological order
    visited = 0
    while queue:
        node = queue.pop(0)
        visited += 1
        
        # Reduce in-degree for all neighbors
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we couldn't visit all nodes, there must be a cycle
    return visited == len(graph)

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: PipelineRequest):
    try:
        # Count nodes and edges
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        
        # Check if the graph is a DAG
        is_dag_result = is_dag(pipeline.edges)
        
        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag_result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 