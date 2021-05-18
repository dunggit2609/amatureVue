import { validationMixin } from 'vuelidate'
<template>
  <div class="hello">
    <div v-if="hasLogin" class="displayLoggedIn">
      <div>Hi {{ user.email }}, you have logged in</div>
      <br />
      <button v-on:click="Logout">Log out</button>
    </div>
    <md-snackbar :md-active="!hasLogin"
      >You have not log in, back to login page!</md-snackbar
    >
  </div>
</template>

<script>
export default {
  name: 'LoggedIn',
  data: () => ({
    user: {
      email: ''
    },
    hasLogin: null
  }),
  methods: {
    // logout => clear localstorage, update state, redirect về trang login
    Logout () {
      localStorage.removeItem(`user`)
      this.$store.dispatch('setUserInfo', null)
      this.$router.push(`/`)
    }
  },
  // khi page được khởi tạo init data, nếu chưa login sẽ redirect về trang login (private route)
  beforeCreate () {
    const user = this.$store.getters.userInfo
    if (user !== null) {
      this.user.email = user.email
      this.hasLogin = true
    }
    if (user === null) {
      this.hasLogin = false
      setTimeout(() => {
        this.$router.push(`/`)
      }, 2000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
*/
