<template>
  <v-app id="inspire">
    <cont-login></cont-login>
    <cont-toolbar :color="'success darken-2'"></cont-toolbar>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>


</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  }

  #menu ul {
    padding:0px;
    margin:0px;
    text-align: center;
    background-color:#EDEDED;
    list-style:none;
    li {
      display: inline;
      background-color: burlywood;
    }
  }
</style>
