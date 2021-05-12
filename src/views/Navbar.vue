<template>
  <div v-if="isLogin">
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

      <span>Saeed</span>
      <v-btn class="primary d-none d-sm-flex" small depressed @click="logout">
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLogin: false,
    };
  },
  mounted() {
    this.isLogin = localStorage.getItem("jwt");
  },
  methods: {
    logout() {
      localStorage.removeItem("jwt");
      this.isLogin = false;
      this.$router.push({ name: "Login" });
    },
  },
  watch: {
    $route() {
      this.isLogin = localStorage.getItem("jwt");
    },
  },
};
</script>
