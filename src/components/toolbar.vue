<template>
    <div class="toolbar"> 
         <ColorPicker :visible='true' @change="methods.changeColorLine"/>
    </div>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs} from 'vue'
import {ElColorPicker, ElPopover, ElButton} from 'element-plus'
import ColorPicker, {ColorPorps} from './ColorPicker.vue'

export default defineComponent({
  name: 'toobar',
  components:{
      ElColorPicker, ElPopover, ElButton, ColorPicker
  },
  props: {
  },
  setup({}, {emit}) { 
   const state = reactive({

    })
    
    const methods = {
        /**
         * @description 监听边框色值改变时触发
         * @param color 色值
         */
      changeColorLine(color: ColorPorps){
          console.log(color)
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
    position: relative;
    padding-left: 35px;
    background-color: #f3f3f3;
    border-top: 1px solid #cbcccc;
    height: 36px;
    font-size: 12px;
    min-width: 1050px;
    box-shadow: inset 0 1px 0 0 #fff;
    background-color: #f5f5f5;
    background-image: linear-gradient(top,#f5f5f5,#eee);
    border-bottom: 1px solid #aaaaaa;
}
.picker{
    position: relative;
    z-index: 1;
    box-sizing: content-box;;
}
</style>