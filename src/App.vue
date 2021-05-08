<template>
  <v-app>
    <v-toolbar color="primary" dark max-height="52px" dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-btn router depressed class="primary" to="/">
          <v-icon>mdi-home</v-icon> Posts
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn to="/write" router class="success mx-1">
        <v-icon left>mdi-plus-circle-outline</v-icon>
        new post
      </v-btn>
      <v-btn icon class="mx-1 d-none d-sm-flex">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon class="mx-1 d-none d-sm-flex">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon class="mx-1 d-none d-sm-flex">
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn class="primary mx-1 d-none d-sm-flex" depressed>
        <span>Saeed</span>
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
    <router-view />
  </v-app>
</template>
<style scoped>
#app {
  background-color: rgb(243, 243, 243);
}
</style>
