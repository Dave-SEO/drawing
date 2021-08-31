<template>
    <el-tooltip class="item" effect="dark" content="填充样式" placement="bottom">
      <el-button type="text" class="iconfont bg" :id="Tools.FillTools" icon="icon-tianchong" :style="{'border-bottom-color': color}" @click="methods.clickHandler"></el-button>
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
  name: Tools.FillTools,
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
            emit('change', Tools.FillTools)
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
    font-size: 20px;
    color: #333;
    @include tools-bg();
    border-bottom: 2px solid #333;
}
</style>