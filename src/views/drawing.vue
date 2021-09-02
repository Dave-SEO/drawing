<template>
  <div class="draw">
      <header class="header">
          <Button @click="methods.download" class="btn">下载图片</Button>
          <Button @click="methods.bpmnHandler" class="btn">查看数据</Button>
      </header>
       <Toolbar :clickTypeAndData='clickTypeAndData'/>
      

      <div class="container-main">
          <div class="left">
              <div class="node-panel">
                    <div  class="node-item" v-for="(item,index) in methods.shapeTool()" :key="index" @mousedown='methods.dragHandler(item)'>
                        <div class="iconfont node-item-icon" :class="item.class" :title="item.text"></div>
                        <span class="label">{{item.text}}</span>
                    </div>
                </div>
          </div>
          <div class="right">
              <div class="container-sub">
                  <div class="container-wrap">
                     <div id="container"></div>
                  </div>
              </div>
          </div>
          
      </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, nextTick, onMounted, reactive, toRaw, toRefs} from 'vue'
import LogicFlow from '@logicflow/core';

import '@logicflow/core/dist/style/index.css';
import { Control, Menu, DndPanel, SelectionSelect, Snapshot, BpmnAdapter, NodeResize } from '@logicflow/extension';
import '@logicflow/extension/lib/style/index.css'
import {data} from '../assets/json/data'
import * as LogicFlowConfig from '../config'
import {Button} from 'ant-design-vue'
import Toolbar from '@/components/toolbar.vue'
import {registerDownload} from '../node/bingxing'
import { save } from '../config';
LogicFlow.use(Control);
LogicFlow.use(Menu);
LogicFlow.use(DndPanel);
LogicFlow.use(SelectionSelect);
LogicFlow.use(Snapshot);
// LogicFlow.use(BpmnAdapter);
NodeResize.step = 4;
LogicFlow.use(NodeResize);

export type clickTypeAndDataProps = {
        type: ClickTypeProps,
        id: string | '',
        lf:  null | LogicFlow
    }

interface StateProps {
    logicFlowInstance: null | LogicFlow;
    clickNodeId: string;
    clickEdgeId: string;
    isvisible: boolean;
    getGraphData: null | {[key: string]: any},
    clickTypeAndData: clickTypeAndDataProps
}
type ClickTypeProps = 'line' | 'node' | ''
type shapeProps = {type: string, text: string, class: string}
export default defineComponent({
  name: 'logicFlow',
  components:{
      Button, Toolbar
  },
  props: {
    modelValue: {
      type: Number || String,
      required:true
    },
  },
  setup() { 
   const state = reactive<StateProps>({
       logicFlowInstance: null,
       clickNodeId: '',
       clickEdgeId: '',
       isvisible: false,
       getGraphData: null,
       clickTypeAndData: {
           type: '',
           id: '',
           lf: null
       }
    })

    const methods = {
        /**
         * @describe 初始化画布，创建LogicFlow实例
         * @see http://logic-flow.org/guide/basic/logic-flow.html
         */
        init(){
            const lf = state.logicFlowInstance = new LogicFlow({
                container: document.querySelector('#container') as HTMLElement,
                stopScrollGraph: true,
                stopZoomGraph: true,
                width: window.innerWidth - 100 - 140,
                height: window.innerHeight - 72 - 140,
                grid: {
                    type: 'mesh',
                    size: 20,
                },
                edgeType: 'polyline', //line 直线 polyline 折线 bezier 贝塞尔曲线
                snapline: true, //是否启用节点辅助对齐线
                keyboard: {//cv delete快捷键
                    enabled: true
                },
                metaKeyMultipleSelected: true  // 是否开启功能键按住多选
            });
             // 右键保存
             LogicFlowConfig.save(lf)
            
            // 注册自定义组件
            methods.registerComponent()
             /**
              * 可以把工具栏放入画布中
              */
             // LogicFlowConfig.setPatternItems(lf)
            lf.render(data);

            methods.monitorEvent();
            lf.setProperties('', {})
            // 开启多选模式
            lf.updateEditConfig({
                stopMoveGraph: true
            })
        },
        /**
         * @describe 导出图片
         * @see http://logic-flow.org/guide/extension/snapshot.html
         * @example 可以使用任意方式触发，然后将绘制的图形下载到本地磁盘上
         * lf.getSnapshot()
         */
        download(){
            state.logicFlowInstance?.getSnapshot()
        },
        /**
         * @describe 获取bpmn数据
         * @see http://logic-flow.org/guide/extension/adapter.html
         */
        bpmnHandler(){
            const getGraphData =  state.logicFlowInstance?.getGraphData()
            console.log(getGraphData)
            state.getGraphData = getGraphData
            alert(JSON.stringify(getGraphData))
        },
        /**
         * @describe 注册自定义组件
         * @see http://logic-flow.org/guide/extension/component-custom.html
         */
        registerComponent(){
            state.logicFlowInstance && registerDownload(state.logicFlowInstance)
        },
        /**
         * @describe 工具栏
         * @param item 拖拽属性
         */
        dragHandler(item: shapeProps){
            state.logicFlowInstance?.dnd.startDrag({
                type: item.type,
                text: item.text,
                properties: {}
            })
        },
        /**@describe 画布中工具栏属内容
         * @returns 工具栏集合
         */
        shapeTool: () => (
            [
                {type: 'rect', text: '矩形',class:'node-rect icon-juxing'},
                {type: 'diamond', text: '菱形',class:'node-diamond icon-lingxing'},
                {type: 'circle', text: '圆形',class:'node-circle icon-yuanxing'},
                {type: 'ellipse', text: '椭圆',class:'node-ellipse icon-tuoyuan'},
                {type: 'diamond-b', text: '并行分支',class:'node-rect icon-binghang-1'}
            ]
        ),
        /**
         * @description 放大或缩小画布
         * @param isZoomIn: boolean
         */
        zoom(isZoomIn: boolean){
            state.logicFlowInstance?.zoom(isZoomIn)
        },
        /**
         * @description 还原画布大小
         */
        resetZoom(){
            state.logicFlowInstance?.resetZoom()
        },
        /**
         * @description 等比缩小 
         * @param size:number
         */
        setZoomMiniSize(size: number){
            state.logicFlowInstance?.setZoomMiniSize(size)
        },
         /**
         * @description 等比放大
         * @param size:number
         */
        setZoomMaxSize : function (size: number){
            state.logicFlowInstance?.setZoomMaxSize(size);
        },
        /**
         * @description 将图形移动到画布中心 focusOnArgs:{id:"内容ID",coordinate: {x: 11,y: 22}}
         */
        drawCenter(){
            state.logicFlowInstance?.focusOn({coordinate: {x: 180,y: 280}});
        },
        /**
         * @description 返回值，如果是应用了adapter插件，且设置为adapterOut，返回为转换后的数据格式，否则为默认的格式
         */
        getGraphData(){
            console.log(state.logicFlowInstance?.getGraphData())
        },
        /**
         * @description 撤销一步
         */
        undo(){
            state.logicFlowInstance?.undo()
        },
        /**
         * @description 向前一步
         */
        redo(){
            state.logicFlowInstance?.redo()
        },
        /**
         * 事件监听
         */
        monitorEvent(){
             //点击节点将 节点ID记录下来
             state.logicFlowInstance?.on('element:click', (callback) => {
                 console.log('callback', callback)
                 state.clickTypeAndData.type = ''
                 state.clickTypeAndData.id = ''
                 state.clickTypeAndData.lf = state.logicFlowInstance
              
                  //有连线起始节点的id 说明是线
                 if(callback.data.sourceNodeId){
                     state.clickTypeAndData.type = 'line'
                     state.clickTypeAndData.id = callback.data.id
                 }else{
                     // 是节点
                    state.clickTypeAndData.type = 'node'
                    state.clickTypeAndData.id = callback.data.id
                 }
             })
        }
    }
     
    onMounted(() => nextTick(() => methods.init()))
   
    return { 
      ...toRefs(state),
      methods
    }
  }
 })
</script>

<style lang="scss" scoped>
.draw{
height: 100vh;
.header{
    width: 100%;
    background-color: #F7F7F7;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    .btn{
        margin-right: 20px;
    }
}
.container-main{
    display: flex;
    background-image:url('../assets/images/canvas_bg.jpg');
    .left{
        display: flex;
        justify-content: center;
        width: 100px;
        height: calc(100vh - 73px);
        background-color: #F3F3F3;
        border-bottom: #cccccc solid 1px;
        box-sizing: border-box;
        padding: 10px;
      
        .node-item{
            width: 100px;
            height: 90px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            .node-label{
                color: #333;
            }
            .node-item-icon{
                font-size: 40px;
            }
            .node-item-icon:hover{
                font-size: 50px;
            }
            .label{
                user-select: none;
            }
           
        }
    }
    .right{
       width: calc(100% - 70px);
       height: calc(100vh - 73px);
       overflow: auto;
    }
    .container-sub{
        width: 2000px;
        height: 1000px;
    }
    .container-wrap{
        padding: 20px;
        background-color: #f2f2f2;
        border: 1px solid #ccc;
        box-sizing: border-box;
        width: calc(100vw - 70px - 130px);
        height: calc(100vh - 72px - 100px);
        // overflow: hidden;
    }
}
}
</style>