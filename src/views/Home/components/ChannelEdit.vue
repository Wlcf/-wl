<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <!-- 标题 -->
    <van-cell title="我的频道">
      <van-button
        class="bnt"
        size="mini"
        round
        style="color: red; border-color: red"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <!-- 频道 -->
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="(item, index) in myChannels"
          :class="{ active: item.name === '推荐' }"
          :key="item.id"
          :text="item.name"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          @click="handleMyChannels(item, index)"
        />
      </van-grid>
    </div>

    <!-- 推荐频道 -->
    <!-- 标题 -->
    <van-cell title="推荐频道"></van-cell>
    <!-- 频道 -->
    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
          @click="$emit('add-channel', item)"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'

export default {
  props: {
    myChannels: Array
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  computed: {
    recommendChannels() {
      // 推荐频道= 所有频道 - 我的频道
      // filter返回值：数组
      return this.allChannels.filter((allChannelItem) => {
        return !this.myChannels.find(
          (myChannelItem) => myChannelItem.id === allChannelItem.id
        )
      })
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannelsAPI()
      //   console.log(data)
      this.allChannels = data.data.channels
    },
    handleMyChannels({ name, id }, index) {
      if (this.isEdit && name !== '推荐') {
        // console.log('删除频道', name)
        this.$emit('del-channel', id)
      } else {
        // 1. 关闭弹窗
        // 2. 切换频道
        this.$emit('change-active', index)
      }
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
// postcss插件无法把行内px ---> rem
.channel-edit {
  padding-top: 92px;
}
:deep(.btn) {
  width: 100px;
  font-size: 18px;
}

:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
    .van-grid-item__text {
      margin: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.3rem;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-icon-plus {
      font-size: 0.3rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
