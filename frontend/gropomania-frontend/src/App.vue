<template>
  <div id="app">
    <MyFeed></MyFeed>
    <router-view></router-view>
  </div>
</template>

<script>
import MyFeed from "./components/MyFeed.vue";
import "./style.css";
export default {
  name: "App",
  components: {
    MyFeed,
  },
};
</script>