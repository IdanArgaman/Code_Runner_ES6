<template>
  <div id="app">
    <header class="page-header">Categories</header>
    <nav>
      <router-link
        v-for="file in files"
        :key="file"
        :to="{ name: 'code', params: { codeBase: file } }"
      >
        {{ file }}
      </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "CodeRunnerApp",
  components: {},
  data() {
    return {
      files: [],
    };
  },
  mounted() {
    this.files = require
      .context("./assets/", true, /\.js$/)
      .keys()
      .map((file) => file.substring(2).substring(0, file.length - 5));
  },
};
</script>

<style>
.page-header {
  font-size: 32px;
  font-weight: bold;
  padding-bottom: 15px;
  justify-content: space-evenly;
}
nav {
  display: flex;
  flex-wrap: wrap;
  width: 75%;
}

nav a {
  flex-basis: 150px;
  display: block;
}

nav a:link,
nav a:visited {
  white-space: nowrap;
  background-color: DarkSalmon;
  border: none;
  color: #ffffff;
  padding: 10px 40px;
  text-align: center;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  text-decoration: none;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  border-left: 1px solid white;
  border-top: 1px solid white;
}
nav a:hover,
nav a:active,
nav a.router-link-active {
  background-color: DarkRed;
}
</style>
