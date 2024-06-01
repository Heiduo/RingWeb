<template>
  <section class="image-content">
    <div class="image-item">
      <van-image width="50vw" height="50vw" :src="data.download_url" style="margin-top: 20px">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
        <template v-slot:error>加载失败</template>
      </van-image>
      <p class="image-item-title" v-text="imageTypeValueLabel[data.contact_type]" style="width: 100%"></p>
    </div>
  </section>

</template>
<script setup>
import { imageTypeValueLabel } from '@/utils/data'

const props = defineProps({
  data: { type: Object, default: () => ({}) },
  index: { type: Number, default: 0, }
})
// console.log("data:"+JSON.stringify(data))

</script>

<style lang="less" scoped>
.image-item-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 77px;
  background: #333333;
  border-radius: 6px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 25px;
}
.item-label {
  font-size: 13px;
  color: #B1B1B1;
}
.item-index {
  font-weight: 800;
  color: #FFFFFF;
  font-size: 20px;
}
.item-time-info {
  display: flex;
  flex-direction: column;
  .item-start-date {
    font-size: 17px;
    font-weight: 800;
  }
}
.item-start-time-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}
.item-start-time,.item-start-interval {
  font-size: 13px;
}
.item-start-interval {
  color: #B1B1B1;
}
.image-content {
  .image-item {
    margin-top: 60px;
    text-align: center;
    &:first-child {
      margin-top: 0;
    }
  }
  .image-item-title {
    margin-top: 10px;
    text-align: center;
  }
  .pay-icon {
    width: 20px;
    margin-right: 4px;
  }
}
</style>
