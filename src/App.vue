<template>
  <div id="app">
    <md-snackbar :md-active.sync="isLogin"
      >You logged in, redirect to user page</md-snackbar
    >
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    isLogin: null
  }),
  mounted () {
    const user = localStorage.getItem(`user`)
    if (user !== null) {
      this.isLogin = true
      setTimeout(() => {
        this.$router.push('loggedin')
      }, 1000)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
