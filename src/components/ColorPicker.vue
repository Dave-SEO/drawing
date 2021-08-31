<template>
    <!-- :colors-default="predefineColors" -->
     <div>
        <ColorPicker
          v-show="visible"
          class="picker"
          theme="light"
          :color="color"
          @changeColor="changeColor"
    />
     </div>
</template>

<script lang='ts'>
import {defineComponent, onMounted, onUnmounted, reactive, toRefs, nextTick, watch} from 'vue'
import { ColorPicker } from 'vue-color-kit'
import {Tools} from '@/enum'
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
    },
    handlerVisible: {
      type: Function,
      required: false
    }
  },
  setup(props, {emit}) { 
   const state = reactive({ 
        color: '#59c7f9',
        suckerCanvas: null,
        suckerArea: [],
        isSucking: false,
        predefineColors
    })
   
   /**
    * @description 画板打开需要监听document点击事件，.lf-tool-overlay svg画布有pointerEvents属性阻止点击事件，会使监听失效，
    * 画板打开pointerEvents = 'all'，画板关闭恢复正常
    */
   watch([() => props.visible], () => {
     if(props.visible){
      (document.querySelector('.lf-tool-overlay') as HTMLElement).style.pointerEvents = 'all'
     }else{
      (document.querySelector('.lf-tool-overlay') as HTMLElement).style.pointerEvents = 'none'
     }
   })
   
    const methods = {
       changeColor(color: ColorPorps) {
        emit('change', color)
        // props.handlerVisible && props.handlerVisible(false)
      },
      outClickOffset(){
        // 判断当前点击的元素是否在某个元素内部
        const handler = (e: MouseEvent, el: HTMLElement | null ) => {
             console.log('e.target', e.target)
          if(el){
            // 当前点击的元素是否是icon的父元素Button
            const parentId = (e.target as HTMLElement).parentElement?.id
            const isParentId = parentId === Tools.LineTools || parentId === Tools.TextTools ||  parentId === Tools.FillTools
            console.log('isParentId', isParentId)
         
            if(!isParentId){
              if(!el.contains(e.target as HTMLElement)){
                props.handlerVisible && props.handlerVisible(false)
              }
            }
          }
        }

         onMounted(() => nextTick(() => {
            document.addEventListener('click', (e) => handler(e, document.querySelector('.picker')))
          }))
        onUnmounted(() => document.removeEventListener('click', () => handler))
      }
    }

    methods.outClickOffset()
  
    return { 
      ...toRefs(state),
      ...methods
    }
  }
 })
</script>

<style lang="scss" scoped>
.picker{
    position: absolute;
    z-index: 1;
    box-sizing: content-box;;
}
</style>