<template>
  <v-toolbar
      :color="color"
      dark
      app
      clipped-left
      fixed
    >
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-xs-only">Alessandro Demo</span>
      </v-toolbar-title>
          <v-btn icon to="/home">
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn icon to="/banks">
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <span>{{auth.email}}</span>
    </v-toolbar>
</template>

<script>
export default {
  name: 'toobar',
  props: {
    color: {
      type: String,
      required: true,
      default: 'success darken-2'
    }
  },
  computed: {
    auth () {
      return this.$store.state.userData
    }
  }
}
</script>
