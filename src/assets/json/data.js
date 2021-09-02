export const data = {
    // 节点
    nodes: [
      {
        id: 50,
        type: 'rect',
        x: 100,
        y: 150,
        text: '你好',
      },
      {
        id: 21,
        type: 'circle',
        x: 300,
        y: 150,
      },
      {type: 'diamond-b', 
      text: '并行分支',
      class:'node-rect icon-binghang-1',
      x: 400,
      y: 150,
    }
    ],
    // 边
    edges: [
      {
        type: 'polyline',
        sourceNodeId: 50,
        targetNodeId: 21,
        text: 'polyline'
      },
    ],
  };