<template>
  <van-nav-bar class="top-nav-bar dark-nav-bar" @click-left="onClickLeft" v-bind="$attrs" fixed left-arrow />
</template>

<script setup>
const props = defineProps({
  clickLeft: { type: Function, }
})
function onClickLeft() {
  if (typeof props.clickLeft === 'function') {
    props.clickLeft()
  } else {
    history.back()
  }
}
</script>

<style lang="less" scoped>
.dark-nav-bar {
  margin: auto;
  z-index: 1000;
  --van-nav-bar-background: #333333;
  --van-border-color: #ffffff;
  --van-nav-bar-title-text-color: #000000;
  --van-nav-bar-icon-color: #D1C4E9;
  --van-nav-bar-text-color: #b1b1b1;
}
</style>
