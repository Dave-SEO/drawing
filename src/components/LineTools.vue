<template>
    <el-tooltip class="item" effect="dark" content="线条颜色" placement="bottom">
      <el-button type="text" class="iconfont panson" icon="icon-bi" @click="methods.clickHandler"></el-button>
    </el-tooltip>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs} from 'vue'
import {ElTooltip, ElButton} from 'element-plus'
/**
 * @description 线条颜色工具
 */
export default defineComponent({
  name: 'LineTools',
  components:{
      ElTooltip, ElButton
  },
  props: {
    modelValue: {
      type: Number || String,
      required:true
    },
  },
  setup() { 
   const state = reactive({ 
    })

    const methods = {
        clickHandler(){
            
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
.panson{
    color: #333;
    @include tools-bg();
    @include border-bottom();
}
</style>