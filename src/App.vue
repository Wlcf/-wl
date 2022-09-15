<template>
  <div>
    <transition name="van-slide-left" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {}
</script>

<style scopen>
.box {
  width: 700px;
  height: 60px;
  background-color: cornflowerblue;
}
</style>
