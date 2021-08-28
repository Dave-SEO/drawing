
import LogicFlow from '@logicflow/core';
export const save = (lf: LogicFlow) => {
  lf.addMenuConfig({
    nodeMenu: [
      {
        text: '保存',
        callback() {
          alert('保存成功！');
        }
      },
      {
        text: '属性',
        callback(node: any) {
          alert(`
            节点id：${node.id}
            节点类型：${node.type}
            节点坐标：(x: ${node.x}, y: ${node.y})`
          );
        },
      },
    ],
    edgeMenu: [
      {
        text: '属性',
        callback(edge: any) {
          alert(`
            边id：${edge.id}
            边类型：${edge.type}
            边坐标：(x: ${edge.x}, y: ${edge.y})
            源节点id：${edge.sourceNodeId}
            目标节点id：${edge.targetNodeId}`
          );
        },
      },
    ],
    graphMenu: [
      {
        text: '保存',
        callback() {
          alert('保存成功！');
        }
      },
    ],
  });
}