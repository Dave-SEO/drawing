<template>
    <div class="toolbar"> 
         <LineTools @change="methods.changeTools" :color='lineToolsColor' />
         <TextTools @change="methods.changeTools" :color='textToolsColor' />
         <FillTools @change="methods.changeTools" :color='fillToolsColor' />
         <ColorPicker :visible='visible' @change="methods.changeColorLine" :handlerVisible='methods.handlerVisible'/>
    </div>
</template>

<script lang='ts'>
import {defineComponent, PropType, reactive, toRefs} from 'vue'
import {ElColorPicker, ElPopover, ElButton} from 'element-plus'
import ColorPicker, {ColorPorps} from './ColorPicker.vue'
import LineTools from './LineTools.vue'
import TextTools from './TextTools.vue'
import FillTools from './FillTools.vue'
import {Tools} from '@/enum'
import {clickTypeAndDataProps} from '@/views/drawing.vue'
export default defineComponent({
  name: 'toobar',
  components:{
      ElColorPicker, ElPopover, ElButton, ColorPicker, LineTools, TextTools, FillTools
  },
  props: {
      clickTypeAndData: {
          type: Object as PropType<clickTypeAndDataProps>
      }
  },
  setup(props, {emit}) { 
   const state = reactive({
       toolsType: '',
       visible: false,
       lineToolsColor: '',
       textToolsColor: '',
       fillToolsColor: ''
    })
    
    const methods = {
        /**
         * @description 监听边框色值改变时触发
         * @param color 色值
         */
      changeColorLine(color: ColorPorps){
          switch (state.toolsType) {
              case Tools.LineTools:
                  state.lineToolsColor = color.hex
                  methods.setProperties({
                      lineColor: color.hex
                  })
                  break;
              case Tools.TextTools:
                   state.textToolsColor = color.hex
                   methods.setProperties({
                        textColor: color.hex
                    })
                  break;
              case Tools.FillTools:
                  state.fillToolsColor = color.hex
                  methods.setProperties({
                    fillColor: color.hex
                  })
                  break;
              default:
                  break;
          }
      },
      /**
       * @description 点击工具时触发
       * @param name 点击的是哪个工具
       */
      changeTools(name: string){
          state.visible = true;
          state.toolsType = name;
          const el = (document.getElementById(`${name}`) as HTMLElement)
          const elColorPicker = (document.querySelector('.picker') as HTMLElement)
          if(el){
            const {left} = el.getBoundingClientRect();
            elColorPicker.style.left = left + 'px';
            
            // 获取底部距离父元素的距离
            const bottom = el.offsetTop + el.offsetHeight
            elColorPicker.style.top = bottom + 10 + 'px'
          }
      },
      handlerVisible(){
          state.visible = false
      },
      setProperties(properties: Object){
        props.clickTypeAndData?.lf?.setProperties(props.clickTypeAndData?.id, properties)
      }
    }
    return { 
      ...toRefs(state),
      methods
    }
  }
 })
</script>

<style lang="scss" scoped>
.toolbar{
    display: flex;
    align-items: center;
    padding-left: 35px;
    background-color: #f3f3f3;
    border-top: 1px solid #cbcccc;
    position: relative;
    height: 36px;
    font-size: 12px;
    min-width: 1050px;
    box-shadow: inset 0 1px 0 0 #fff;
    background-color: #f5f5f5;
    background-image: linear-gradient(top,#f5f5f5,#eee);
    border-bottom: 1px solid #aaaaaa;
}
</style>