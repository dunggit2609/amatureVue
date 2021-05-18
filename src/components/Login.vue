<template>
  <div class="hello">
    <form novalidate class="layout" @submit.prevent="validateUser">
      <md-card class="layout-item size-50 small-size-100">
        <md-card-header>
          <div class="md-title">Đăng nhập</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="form.email"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.email.required"
              >The email is required</span
            >
            <span class="md-error" v-else-if="!$v.form.email.email"
              >Invalid email</span
            >
          </md-field>
          <md-field :class="getValidationClass('password')">
            <label>Password</label>
            <md-input v-model="form.password" type="password" />
            <span class="md-error" v-if="!$v.form.email.required"
              >The password is required</span
            >
            <span class="md-error" v-else-if="validateFlag.passwordInvalid"
              >Invalid password</span
            >
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending"
            >Create user</md-button
          >
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved"
        >The user was saved with success!</md-snackbar
      >
      <md-snackbar :md-active.sync="userSavedFailed"
        >Saving the user was failed!</md-snackbar
      >
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'FormValidation',
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null
    },
    validateFlag: {
      passwordInvalid: false
    },
    userSaved: false,
    sending: false,
    lastUser: null,
    userSavedFailed: false
  }),
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  methods: {
    // Khi các field invalid thì bôi đỏ field
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]
      const customValidate = this.form[fieldName]
      if (
        fieldName === 'password' &&
        customValidate &&
        !customValidate.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
      ) {
        return {
          'md-invalid': true
        }
      }
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.email = null
      this.form.password = null
    },
    // update state nếu login thành công
    setUserInfo () {
      const userInfo = { email: this.form.email, password: this.form.password }
      this.$store.dispatch('setUserInfo', userInfo)
    },
    // login thành công => update state, redirect tới trang logged in
    // login failed => clear form, hiện snackbar
    saveUser () {
      this.sending = true

      window.setTimeout(() => {
        if (
          this.form.email === 'davidnguyendung71@gmail.com' &&
          this.form.password === 'Dung2609'
        ) {
          this.userSaved = true
          this.sending = false
          window.setTimeout(() => {
            this.$router.push('/loggedin')
            this.setUserInfo()
            localStorage.setItem(`user`, this.form.email)
            this.clearForm()
          }, 1000)
        } else {
          this.userSavedFailed = true
          this.sending = false
          this.clearForm()
        }
      }, 1500)
    },
    // validate các field
    validateUser () {
      this.$v.$touch()
      if (
        this.form.password &&
        !this.form.password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
      ) {
        this.validateFlag.passwordInvalid = true
        console.log(`ne`)
      }
      if (
        this.form.password &&
        this.form.password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
      ) {
        console.log(`here`)
        this.validateFlag.passwordInvalid = false
      }
      // console.log(`asdasd`, this.validateFlag.passwordInvalid)
      if (!this.$v.$invalid && this.validateFlag.passwordInvalid === false) {
        console.log(`here`)
        this.saveUser()
      }
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
.hello {
  display: flex;
  justify-content: center;
  align-items: center;
}
.layout {
  width: 50vw;
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
