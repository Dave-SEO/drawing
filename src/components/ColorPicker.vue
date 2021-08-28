<template>
    <!-- :colors-default="predefineColors" -->
      <ColorPicker
        v-if="visible"
        class="picker"
        theme="light"
        :color="color"
        @changeColor="changeColor"
    />
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs} from 'vue'
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'
export type ColorPorps = {
  hex: string,
  hsv: {h: number, s: number, v: number},
  rgba: {r:number, g: number, b: number, a: number}
}
const predefineColors = [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577'
]
/**
 * @description 拾色器 https://github.com/anish2690/vue-color-kit
 */
export default defineComponent({
  name: 'MyColorPicker',
  components:{
     ColorPicker
  },
  emits: ['change'],
  props: {
    visible: {
        type: Boolean,
        required: false
    }
  },
  setup({}, {emit}) { 
   const state = reactive({ 
        color: '#59c7f9',
        suckerCanvas: null,
        suckerArea: [],
        isSucking: false,
        predefineColors
    })
    
    const methods = {
       changeColor(color: ColorPorps) {
        emit('change', color)
      }
    }
    return { 
      ...toRefs(state),
      ...methods
    }
  }
 })
</script>

<style lang="scss" scoped>
.picker{
    position: relative;
    z-index: 1;
    box-sizing: content-box;;
}
</style>