<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  * {
    margin: 0;
    padding: 0;
  }
  
  html,
  body {
    height: 100%;
  }
  
  body {
    background-position: center;
    font-family: Lato, Helvetica, sans-serif;
    margin: 0;
    overflow-x: hidden;
  }
  
  .full-height {
    height: 100%;
  }
</style>

<template>
  <div id="#app" class="full-height">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from './vuex/store'
  import notifications from './components/mixins/notifications';

  export default {
    mixins: [
      notifications
    ],
    store,
    data: () => {
      return {

      }
    }
  }

</script>