<template>
  <navbar-app></navbar-app>
  <router-view></router-view>
</template>

<script>
import NavbarApp from './components/UI/NavbarApp'

export default {
  name: 'App',
  components: {
    NavbarApp
  }
}
</script>

<style lang="scss">
/* RESET */
html {
    box-sizing: border-box;
    font-size: 16px;
    height: 100%;
}
*, *:before, *:after {
    box-sizing: inherit;
}
body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
}
ol, ul {
    list-style: none;
}
a {
    text-decoration: none;
}
img {
    max-width: 100%;
    height: auto;
}
body {
    height: 100%;
    font-family: Arial, Helvetica, sans-serif;
}

.mr-1 {
  margin-right: 10px;
}
.ml-1 {
  margin-left: 10px;
}
.m-1 {
  margin: 10px;
}
.t-u {
  text-decoration: underline;
}
.text-danger {
  color: #F73B1E;
}
.text-center {
  text-align: center;
}
.flex-x-y {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* VARIABLES */
$primary-color: #A68F1F;
$secondary-color: #F2E635;
$info-color: #DEAE6A;
$danger-color: #F73B1E;
$warning-color: #F7CC20;
</style>
