<template>
  <div>
    <div>LOGIN</div>
    <div class="form-field">
      <div><input v-model="form.email" type="email" placeholder="Enter email address"></div>
      <div><input v-model="form.password" type="password" placeholder="Enter password"></div>
    </div>
    <button class="btn btn-success" @click="this.handleLogin">Login</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      await this.$http.post(this.$rootUrl + 'auth/login', this.form)
        .then(response => {
          let user = response.data.user
          if (response.data.success) {
            localStorage.setItem('user', JSON.stringify(user))
            this.$router.push('/list')
          } else {
            console.log('Login failed')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
