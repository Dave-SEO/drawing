<template>
    <el-tooltip class="item" effect="dark" content="线条颜色" placement="bottom">
      <el-button type="text" class="iconfont bg" :id="Tools.LineTools" :style="{'border-bottom-color': color}" icon="icon-bi" @click="methods.clickHandler"></el-button>
    </el-tooltip>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs} from 'vue'
import {ElTooltip, ElButton} from 'element-plus'
import {Tools} from '@/enum'
/**
 * @description 线条颜色工具
 */
export default defineComponent({
  name: Tools.LineTools,
  components:{
      ElTooltip, ElButton
  },
  emits: ['change'],
  props: {
    modelValue: {
      type: Number || String,
      required:true
    },
    color: {
      type: String
    }
  },
  setup({}, {emit}) { 
   const state = reactive({ 
    })

    const methods = {
        clickHandler(){
           emit('change', Tools.LineTools)
        }
    }
    return { 
      ...toRefs(state),
      methods,
      Tools
    }
  }
 })
</script>

<style lang="scss" scoped>
.bg{
    color: #333;
    @include tools-bg();
    border-bottom: 2px solid #333;
}
</style>