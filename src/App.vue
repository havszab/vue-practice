<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {Navbar}
}
</script>

<style>
  button {
    cursor: pointer;
  }
  body {
    background-color: #7aa030;
    overflow-x: hidden;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #ecef7f;
}
.form-field div{
  display: inline-block;
  margin: 3px;
}
.form-field span {
  padding: 5px;
  font-size: 1.3em;
}
.form-field input {
  border-radius: 7px;
  padding: 7px;
  font-size: 1em;
}
.btn {
  margin: 5px;
  padding: 5px 8px;
  border-radius: 7px;
  font-size: 0.9em;
}
.btn-success {
  background-color: #CCFFCC;
}
.btn-success:hover {
  background-color: #7aa030;
  color: white;
}
.btn-danger {
  background-color: #FF5C3E;
}
.btn-danger:hover {
  background-color: darkred;
  color: white;
}
</style>
