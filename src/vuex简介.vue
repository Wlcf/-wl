<template>
  <div>
    <!-- <router-view></router-view> -->
    <!-- 展示count -->
    <h1>{{ count }}</h1>

    <h1>count的十倍: {{ bigNum }}</h1>

    <button @click="SET_COUNT(10)">点击count</button>
  </div>
</template>

<script>
// mapState ---> 将vuex里面state映射到computed
// 使用
//  - 引入mapState：函数放回一个对象
//  - 参数：['映射的属性]

// mapGetters ---> 将vuex里面getters映射到computed

// mapMutations ---> 将vuex里面mutations方法映射到methods
import { mapState, mapGetters, mapMutations } from 'vuex'
console.log(mapState(['count']))
export default {
  data() {
    return {}
  },
  // created() {
  //   console.log(this.$store.state.count)
  // },
  methods: {
    // increment() {
    //   this.$store.commit('SET_COUNT', 10)
    // }
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    // count: function() {
    //   return this.$store.state.count
    // }
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scopen>
.box {
  width: 700px;
  height: 60px;
  background-color: cornflowerblue;
}
</style>
