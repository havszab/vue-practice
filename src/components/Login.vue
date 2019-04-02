<template>
  <div>
    <div>LOGIN</div>
    <div><input v-model="form.email" type="email" placeholder="Enter email address"></div>
    <div><input v-model="form.password" type="password" placeholder="Enter password"></div>
    <button @click="this.handleLogin">Login</button>
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
    handleLogin () {
      localStorage.setItem('user', JSON.stringify(this.form))
      console.log(localStorage.getItem('user'))
      this.$router.push('/list')
    }
  }
}
</script>

<style scoped>

</style>
