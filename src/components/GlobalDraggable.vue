<template>
  <teleport v-if="teleported" to="body">
    <div
      v-show="hide"
      class="move-button"
      ref="moveBtn"
      v-bind="$attrs"
      @mousedown="btnDown"
      @touchstart="btnDown"
      @mousemove="btnMove"
      @touchmove="btnMove"
      @mouseup="btnEnd"
      @touchend="btnEnd"
      @touchcancel="btnEnd"
    >
      <slot></slot>
    </div>
  </teleport>
  <div
    v-else
    v-show="hide"
    class="move-button"
    v-bind="$attrs"
    ref="moveBtn"
    @mousedown="btnDown"
    @touchstart="btnDown"
    @mousemove="btnMove"
    @touchmove="btnMove"
    @mouseup="btnEnd"
    @touchend="btnEnd"
    @touchcancel="btnEnd"
  >
    <slot></slot>
  </div>
</template>
<script setup>
import { onMounted, ref, onUnmounted } from 'vue'

const props = defineProps({
  teleported: { type: Boolean, default: true }
})

const hide = ref(true)
const flags = ref(false)
const position = ref({
  x: 0,
  y: 0
})
const nx = ref(0)
const ny = ref(0)
const dx = ref('')
const dy = ref('')
const xPum = ref('')
const yPum = ref('')
const isShow = ref(false)
const moveBtn = ref(null)
const timer = ref(null)
const currentTop = ref(0)

function hideButton() {
  timer.value && clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    handleScrollEnd()
  }, 300)
  currentTop.value = document.documentElement.scrollTop || document.body.scrollTop
  hide.value = false
}
function handleScrollEnd() {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop === currentTop.value) {
    hide.value = true
    clearTimeout(timer.value)
  }
}
function btnDown(event) {
  flags.value = true
  let touch
  if (event.touches) {
    touch = event.touches[0]
  } else {
    touch = event
  }
  position.value.x = touch.clientX
  position.value.y = touch.clientY
  dx.value = moveBtn.value.offsetLeft
  dy.value = moveBtn.value.offsetTop
}
function btnMove(event) {
  if (flags.value) {
    let touch
    if (event.touches) {
      touch = event.touches[0]
    } else {
      touch = event
    }
    nx.value = touch.clientX - position.value.x
    ny.value = touch.clientY - position.value.y
    xPum.value = dx.value + nx.value
    yPum.value = dy.value + ny.value
    let clientWidth = document.documentElement.clientWidth
    let clientHeight = document.documentElement.clientHeight
    if (xPum.value > 0 && xPum.value < clientWidth - moveBtn.value.offsetWidth) {
      moveBtn.value.style.left = xPum.value + 'px'
    }
    if (yPum.value > 0 && yPum.value < clientHeight - moveBtn.value.offsetHeight) {
      moveBtn.value.style.top = yPum.value + 'px'
    }
    // 阻止页面的滑动默认事件
    document.addEventListener('touchmove', handler, {
      passive: false
    })
  }
}
function btnEnd(event) {
  flags.value = false
  document.addEventListener('touchmove', handler, {
    passive: false
  })
}
function handler(event) {
  if (flags.value) {
    event.preventDefault()
  } else {
    return true
  }
}
onMounted(() => {
  window.addEventListener('scroll', hideButton)
})
onUnmounted(() => {
  window.removeEventListener('scroll', hideButton)
})
</script>

<style lang="less" scoped>
.move-button {
  position: fixed;
  z-index: 10;
}
</style>
