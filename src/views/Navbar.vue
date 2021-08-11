<template>
  <div v-if="isAuth">
    <v-toolbar color="primary" dark max-height="52px" dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
        <a href="/" class="primary"> <v-icon>mdi-home</v-icon> </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn @click="showCreatePost = true" class="success mx-1">
        <v-icon left>mdi-plus-circle-outline</v-icon>
        new post
      </v-btn>
      <v-btn icon class="mx-1 d-none d-sm-flex">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <a icon class="mx-1 d-none d-sm-flex" href="/liked">
        <v-icon :color="$route.name == 'Liked' ? 'red' : ''">mdi-heart</v-icon>
      </a>

      <v-btn icon class="mx-1 d-none d-sm-flex">
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <span class="ml-2">Saeed</span>
      <v-btn class="primary" small depressed @click="logout">
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
    <create-post
      :show="showCreatePost"
      @updateDg="updateDialogState"
    ></create-post>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import CreatePost from "./CreatePost";
export default {
  components: {
    "create-post": CreatePost,
  },
  data() {
    return { showCreatePost: false };
  },
  methods: {
    ...mapMutations(["setAuth"]),
    logout() {
      this.setAuth(false);
      this.$router.push({ name: "login" });
    },
    updateDialogState(value) {
      this.showCreatePost = value;
    },
  },
  computed: {
    ...mapGetters(["isAuth"]),
  },
};
</script>
