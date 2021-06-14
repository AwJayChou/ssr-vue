<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h2 @click="$store.commit('add')">{{$store.state.count}}</h2>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  asyncData({ store }) {
    return store.dispatch("getCount")
  },
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
