<template>
  <div class="wrap_nav">
    <ul class="list_nav">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/Planet">Planet</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .wrap_nav{overflow:hidden;margin-top:38px}
  .list_nav li{float:left;margin-left:10px}
  .list_nav li a{display:block;font-size:15px;color:#eee}
  .list_nav li .active{color:yellow}
</style>
