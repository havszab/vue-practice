<template class="nav-wrapper">
<div>
  <img src="../../static/frog-icon.png" width="150" height="150" alt="">
  <ul class="nav-items">
    <li href="/list">
      Acquisition
    </li>
    <li>
      Store
    </li>
    <li>
      Sales
    </li>
    <li>
      Dashboard
    </li>
    <li>
      Carriers
    </li>
    <li>
      Logout
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.nav-wrapper {
  top: 0;
  left: 0;
  position: fixed;
}
.nav-items{
  border-bottom: #ccc solid 1px;
}
.nav-items li {
  padding: 10px 20px;
  list-style: none;
  display: inline-block;
  cursor: pointer;
  margin: 10px;
}
.nav-items li:hover {
  background-color: #CCFFCC;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
}
</style>
