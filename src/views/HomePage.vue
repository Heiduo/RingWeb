<template>
  <div class="image-result-container">
    <dark-nav-bar v-text="homeTitle" style="padding: 20px 10px 20px 10px;font-size: 20px"/>
    <van-skeleton style="height: 100%;" :loading="loading" :row="skeletonRow">
      <div v-if="loading || dataList.length" style="height: 100%;padding-top: 20px">
        <!--      <div v-if="dataList.length===1">-->
        <!--        <image-item-->
        <!--            v-for="(item, index) in dataList"-->
        <!--            :key="item.contact_url"-->
        <!--            :data="item"-->
        <!--            :index="index"-->
        <!--        />-->
        <!--      </div>-->
        <div>
          <van-list
              :loading="loading"
              finished-text=""
          >
            <image-item
                v-for="(item, index) in dataList"
                :key="item.contact_url"
                :data="item"
                :index="index"
            />
          </van-list>
        </div>
        <div style="bottom: 0;margin-top: 20px;text-align: center;padding: 20px;">
          <p>请长按二维码添加好友</p>
        </div>

      </div>

      <van-empty
          v-if="!loading&&!dataList.length"
          style="margin-top:80px"
          description="暂无二维码信息"
      />
    </van-skeleton>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import ImageItem from './ImageItem.vue'
import DarkNavBar from '@/components/DarkNavBar.vue'
import {useHomeData} from "@/views/measureIndicators/measureResult/useResultData.js";

console.log("HomePage")
const router = useRouter()
const skeletonRow = 1

let {
  loading, homeTitle, dataList, loadFinished, loadMore,
} = useHomeData()
setTimeout(() => {
  console.log(loading.value)
}, 6000)
// export default HomePage
</script>
<style lang="less" scoped>
.image-result-container {
  --van-skeleton-paragraph-height: 77px;
  --van-skeleton-paragraph-background: #ffffff;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #E8EAF6;
  padding: 46px 18px 16px;

  // :deep {
  :deep(.dark-nav-bar) {
    background: #D1C4E9;

    .van-nav-bar__content {
      &::after {
        border-color: #D1C4E9;
      }
    }
  }

  :deep(.van-skeleton) {
    padding: 10px 0 0 0 !important;
    margin: 0 !important;
    height: 100%;
  }

  :deep(.van-list) {
    height: 100%;
    padding: 0;
    overflow-y: auto;
    width: 100% !important;
    -webkit-overflow-scrolling: touch;
  }

  :deep(.image-item-wrap) {
    margin-bottom: 11px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(.van-skeleton-paragraph) {
    width: 100% !important;
    border-radius: 6px;
  }

}

</style>
