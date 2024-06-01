<template>
  <router-view />
</template>
<script setup>
import { setMeasureStatus } from '@/views/measureIndicators/utils'

window.addEventListener('beforeunload', () => {
  setMeasureStatus(0)
})
</script>
<style scoped>

</style>
